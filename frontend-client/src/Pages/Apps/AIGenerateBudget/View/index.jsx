import { Divider, Flex, Text, Box } from "@chakra-ui/react";
import { useEffect, useMemo, useState, Fragment, useRef } from "react";
import axios from "axios";
import DataHeader from "../../../../components/Table/DataHeader";
import { DataLoader } from "../../../../components";
import DataNotFound from "../../../../components/ErrorPages/DataNotFound";
import { config } from "../../../../config";
import { getUserToken } from "../../../../helpers/getToken";
import FormatAIGeneratedBudgetItem from "./FormatAIGeneratedBudgetItem";
import AddAIGenerateBudget from "../Add";

function ChatInterface() {
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState({ filtered: false, loading: true });
  const [messageSent, setMessageSent] = useState(false)

  const cachedBudget = useMemo(() => {
    if (!budget) return null;
    return {
      ...budget,
      total: budget.total,
      data: budget.data,
      filtered: false,
    };
  }, [budget]);

  const userToken = getUserToken();
  const messagesEndRef = useRef(null); // Ref to keep track of the last message

  useEffect(() => {
    async function makeRequest() {
      setLoading(true);
      try {
        const response = await axios.get(`${config.API_URL}/generate-budget`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setLoading(false);
        setBudget({ budget: response.data.data, loading: false });
      } catch (error) {
        setLoading(false);
        setBudget({ loading: false });
        console.log(error);
      }
    }

    makeRequest();
  }, [userToken, messageSent]);

  // Automatically scroll to the last message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [cachedBudget?.budget?.data]);

  return (
    <Flex flexDir="column" h="88vh">
      {/* header */}
      <DataHeader
        count={cachedBudget?.total}
        title="Chat"
        subtitle="This is your chat history with ai generated budget"
      />

      <Divider my={4} />

      <Flex flexDir="column" flex="1" overflowY="auto" p={4} bg="gray.100">
        {loading ? (
          <DataLoader />
        ) : (
          cachedBudget?.budget?.data?.map((message, index) => (
            <Fragment key={index}>
              {message?.userBudget && (
                <Flex
                  flexDir="column"
                  alignSelf="flex-start"
                  bg="red.50"
                  w="fit"
                  maxW="80%"
                  m={2}
                  p={3}
                  borderRadius={6}
                  boxShadow="lg"
                >
                  <Text fontSize="md">
                    <b>Budget: Ksh. </b>{message?.userBudget}
                  </Text>
                  <Text fontSize="md">
                    <b>Budget Description: </b>{message?.userDescription}
                  </Text>
                  <Text fontSize="xs" color="gray.500" textAlign="end">
                    {new Date(message.createdAt).toUTCString()}
                  </Text>
                </Flex>
              )}

              {message?.generatedBudget && (
                <Flex
                  flexDir="column"
                  alignSelf="flex-end"
                  bg="white"
                  w="fit"
                  maxW="80%"
                  m={2}
                  p={3}
                  borderRadius={6}
                  boxShadow="lg"
                >
                  <Box my={2}>
                    <Text fontWeight={800}>Generated Budget Response</Text>
                    <Text fontSize="md" my={1}>
                      <FormatAIGeneratedBudgetItem data={message.generatedBudget.message.content} />
                    </Text>
                  </Box>
                  <Text fontSize="xs" color="gray.500" textAlign="end">
                    {new Date(message.createdAt).toUTCString()}
                  </Text>
                </Flex>
              )}
            </Fragment>
          ))
        )}

        {!loading && cachedBudget?.budget?.data?.length === 0 && (
          <DataNotFound />
        )}

        {/* Empty div for scrolling to the last message */}
        <div ref={messagesEndRef} />
      </Flex>

      <Flex p={4} bg="white" boxShadow="md">
        <AddAIGenerateBudget setMessageSent={setMessageSent} />
      </Flex>
    </Flex>
  );
}

export default ChatInterface;
