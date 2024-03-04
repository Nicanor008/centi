import {
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Box,
  Tr,
  Th,
  Td,
  Center,
  TableContainer,
  Tbody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewUserBudgetItems() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState();
  const [budgetItems, setBudgetItems] = useState();
  const { budgetId } = useParams();

  //   STEP 1: GET Budget
  useEffect(() => {
    let config = {
      method: "get",
      url: `http://localhost:4005/api/v1/budget/${budgetId}/`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setBudget(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  //   STEP 2: GET all budget items in a budget
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:4005/api/v1/budget-items/budget/${budgetId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setBudgetItems(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    makeRequest();
  }, []);

  return (
    <Flex flexDir="column">
      {/* header */}
      <Flex
        py={4}
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="gray.300"
        mb={[1, 4]}
      >
        <Flex alignItems="center" gap={2}>
          {budgetItems?.data?.length ? (
            <Text
              bg="gray.300"
              p="2px 8px"
              borderRadius="full"
              fontWeight="bold"
            >
              {budgetItems?.data?.length}
            </Text>
          ) : (
            <Box />
          )}
          <Flex flexDir="column">
            <Text fontWeight={600} fontSize={16}>
              {budget?.name}
            </Text>
            <Text color="gray.500" fontSize={12} fontWeight={400}>
              {budget?.description}
            </Text>
          </Flex>
        </Flex>

        <Flex mr={[0, 8]}>
          <Button mr={3}>Search</Button>
          <Button
            bg="red.400"
            color="white"
            onClick={() =>
              navigate("/budget/add/2", {
                state: { budget: { ...budgetItems, _id: budgetId } },
              })
            }
            _hover={{
              bg: "red.400",
            }}
          >
            +
          </Button>
        </Flex>
      </Flex>
      Total Expenses - KES. 5000 <br />
      You still within your budget (budget.plannedIncome -
      budgetItems.totalExpenses)
      <TableContainer bg="gray.200" my={4}>
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Expenses</Th>
              <Th>Planned Income</Th>
              <Th>Active</Th>
              <Th>Recurring</Th>
              <Th>Date Created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {budgetItems?.data?.length > 0 &&
              budgetItems?.data?.map((item, idx) => (
                <Tr
                  cursor="pointer"
                  key={idx}
                  // onClick={() => navigate("/item/add/2", { state: { item } })}
                >
                  <Td>{item.name}</Td>
                  <Td>{item?.description}</Td>
                  <Td>KES {item?.plannedExpenses}</Td>
                  <Td>KES {item?.actualExpenses}</Td>
                  <Td>{item?.isActive ? "Yes" : "No"}</Td>
                  <Td>{item?.isRecurring ? "Yes" : "No"}</Td>
                  <Td>{new Date(item?.createdAt).toLocaleDateString()}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {budgetItems?.data?.length < 1 && (
        <Flex
          alignItems="center"
          justifyContent="center"
          h="65vh"
          flexDir="column"
          gap={4}
        >
          <Text>You haven't created an expense yet</Text>
          <Button
            bg="red.400"
            color="white"
            onClick={() =>
              navigate("/budget/add/2", {
                state: { budget: { ...budgetItems, _id: budgetId } },
              })
            }
            _hover={{
              bg: "red.400",
            }}
          >
            Add Expense
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default ViewUserBudgetItems;
