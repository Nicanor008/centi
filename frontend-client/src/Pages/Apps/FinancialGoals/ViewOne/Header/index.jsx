import { Flex, Text } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ViewFinancialGoalHeader = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Flex
      py={4}
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="gray.300"
      mb={[1, 4]}
    >
      <Flex alignItems="center" gap={2}>
        <MdArrowBack onClick={() => navigate(-1)} cursor="pointer" />
        <Flex flexDir="column">
          <Text fontWeight={600} fontSize={16}>
            {data.name}
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            {data.description ??
              "Live a happinness guaranteed life with the right goals"}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" mr={[1, 10]}>
        <Text fontWeight={600} fontSize={16}>
          Dateline
        </Text>
        <Text color="gray.500" fontSize={12} fontWeight={400}>
          {new Date(data.to).toDateString()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ViewFinancialGoalHeader;
