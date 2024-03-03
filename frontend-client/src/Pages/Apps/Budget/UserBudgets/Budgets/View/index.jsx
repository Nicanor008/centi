import {
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewUserBudgets() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:4005/api/v1/budget/",
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
        <Flex flexDir="column">
          <Text fontWeight={600} fontSize={16}>
            Budget Tracker
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            This is your budget history
          </Text>
        </Flex>

        <Flex mr={[0, 8]}>
          <Button mr={3}>Search</Button>
          <Button
            bg="red.400"
            color="white"
            onClick={() => navigate("/budget/add/1")}
          >
            Create Budget
          </Button>
        </Flex>
      </Flex>
      {/* view all budgets - content */}
      <Flex alignItems="center" gap={2}>
        <Text bg="gray.300" p="2px 8px" borderRadius="full" fontWeight="bold">
          {budget?.total}
        </Text>{" "}
        View All budgets Content
      </Flex>

      <TableContainer bg="gray.200" my={4}>
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Planned Expenses</Th>
              <Th>Planned Income</Th>
              <Th>Active</Th>
              <Th>Recurring</Th>
              <Th>Date Created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {budget?.data?.map((budget, idx) => (
              <Tr
                cursor="pointer"
                key={idx}
                onClick={() => navigate("/budget/add/2", { state: { budget } })}
              >
                <Td>{budget.name}</Td>
                <Td>{budget?.description}</Td>
                <Td>KES {budget?.plannedExpenses}</Td>
                <Td>KES {budget?.plannedIncome}</Td>
                <Td>{budget?.isActive ? "Yes" : "No"}</Td>
                <Td>{budget?.isRecurring ? "Yes" : "No"}</Td>
                <Td>{new Date(budget?.createdAt).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default ViewUserBudgets;
