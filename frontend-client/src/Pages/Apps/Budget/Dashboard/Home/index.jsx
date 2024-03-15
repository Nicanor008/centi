import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickBudgetAnalyticsNav from "../../../../../components/Analytics/QuickBudgetAnalyticsNav";
import NumberofBudgetItems from "./NumberofBudgetItems";
import PlannedIncomeAndExpenseChart from "./PlannedIncomeAndExpenseChart";

function BudgetDashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState();

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/v1/budget/dashboard/analytics"
        );
        setAnalytics(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  return (
    <Flex flexDir="column">
      {/* header/title */}
      <Flex mb={2} justifyContent="space-between">
        <Flex flexDir="column">
          <Text fontWeight={600} fontSize={20}>
            Budget analytics
          </Text>
          <Text color="gray.500" fontWeight={400} fontSize={14}>
            Summary of your budget expenses and other related activity
          </Text>
        </Flex>
        <Button
          w="fit-content"
          bg="red.400"
          color="white"
          onClick={() => navigate("/budget/add/1")}
          _hover={{
            bg: "red.400",
          }}
        >
          Add Budget
        </Button>
      </Flex>

      <Divider borderColor="gray.300" />

      {/* body */}
      <Flex flexDir="column" my={(2, 8)}>
        {/* cards */}
        <Flex justifyContent="space-between" flexWrap="wrap">
          {analytics?.totalPlannedExpensesThisMonth && (
            <QuickBudgetAnalyticsNav
              title="Expenses(This month)"
              amount={analytics?.totalPlannedExpensesThisMonth}
            />
          )}
          {analytics?.totalBudgetExpensesAmount && (
            <QuickBudgetAnalyticsNav
              title="Expenses"
              amount={analytics?.totalBudgetExpensesAmount}
            />
          )}
          {analytics?.totalNumberofBudgetThisMonth && (
            <QuickBudgetAnalyticsNav
              title="No. Expenses(This month)"
              amount={analytics?.totalNumberofBudgetThisMonth}
              hasCurrency={false}
            />
          )}
          {analytics?.totalNumberofBudgetItems && (
            <QuickBudgetAnalyticsNav
              title="Total No. Expenses"
              amount={analytics?.totalNumberofBudgetItems}
              hasCurrency={false}
            />
          )}
          {analytics?.totalNumberofBudget && (
            <QuickBudgetAnalyticsNav
              title="Total No. Budget"
              amount={analytics?.totalNumberofBudget}
              hasCurrency={false}
            />
          )}
          {analytics?.categoryCount && (
            <QuickBudgetAnalyticsNav
              title="Categories"
              amount={
                analytics?.categoryCount &&
                Object.keys(analytics?.categoryCount).length
              }
              hasCurrency={false}
            />
          )}
        </Flex>

        {/* charts */}
        <Flex
          py={(2, 8)}
          gap={8}
          justifyContent="space-evenly"
          flexDir={["column", "row"]}
        >
          {/* expenses usage */}
          <PlannedIncomeAndExpenseChart />

          {/* expense and income fluctuation or something related */}
          {/* <Flex></Flex> */}

          {/* spending per month */}
          <NumberofBudgetItems />
        </Flex>

        {/* overview */}
        {/* budget overview */}
        <Flex my={(3, 10)}>
          {analytics?.budget?.length > 0 && (
            <Flex
              border="1px solid"
              borderColor="gray.200"
              bg="white"
              flexDir="column"
              p={6}
              boxShadow="md"
              borderRadius={8}
              w={["98%", "48%"]}
              ml={[2, 8]}
            >
              <Text
                py={2}
                bg="gray.50"
                borderRadius={4}
                fontWeight={800}
                textAlign="center"
              >
                Recent Expenses
              </Text>
              {analytics?.budget?.slice(-30)?.map((budget) => (
                <Flex key={budget._id} flexDir="column">
                  <Flex justifyContent="space-between" py={2}>
                    <Text>
                      {budget.name.length > 40
                        ? budget.name.substring(0, 40) + "..."
                        : budget.name}
                    </Text>
                    <Text ml={(2, 6)}>
                      {new Date(budget.createdAt).toDateString()}
                    </Text>
                  </Flex>
                  <Divider borderColor="gray.200" />
                </Flex>
              ))}
              <Flex justifyContent="space-between" mt={4}>
                <Button
                  w="fit-content"
                  bg="none"
                  border="1px solid"
                  borderColor="blue.400"
                  _hover={{
                    bg: "none",
                  }}
                >
                  View all Expenses
                </Button>
                <Button
                  w="fit-content"
                  bg="red.400"
                  color="white"
                  onClick={() => navigate("/budget/add/1")}
                  _hover={{
                    bg: "red.400",
                  }}
                >
                  Add Expense
                </Button>
              </Flex>
            </Flex>
          )}

          <Flex
            border="1px solid"
            borderColor="gray.200"
            bg="white"
            flexDir="column"
            p={6}
            boxShadow="md"
            borderRadius={8}
            w={["98%", "48%"]}
            ml={[2, 8]}
          >
            <Text
              py={2}
              bg="gray.50"
              borderRadius={4}
              fontWeight={800}
              textAlign="center"
            >
              Your Financial goals
            </Text>
            {analytics?.budget?.slice(-30)?.map((budget) => (
              <Flex key={budget._id} flexDir="column">
                {/* <Flex justifyContent="space-between" py={2}>
                  <Text>
                    {budget.name.length > 40
                      ? budget.name.substring(0, 40) + "..."
                      : budget.name}
                  </Text>
                  <Text ml={(2, 6)}>
                    {new Date(budget.createdAt).toDateString()}
                  </Text>
                </Flex>
                <Divider borderColor="gray.200" /> */}
              </Flex>
            ))}
            {/* <Flex justifyContent="space-between" mt={4}>
              <Button
                w="fit-content"
                bg="none"
                border="1px solid"
                borderColor="blue.400"
                _hover={{
                  bg: "none",
                }}
              >
                View all Financial Goals
              </Button>
              <Button
                w="fit-content"
                bg="red.400"
                color="white"
                onClick={() => navigate("/budget/add/1")}
                _hover={{
                  bg: "red.400",
                }}
              >
                Add Financial Goals
              </Button>
            </Flex> */}
          </Flex>
        </Flex>
        {/* budget items overview */}
      </Flex>
    </Flex>
  );
}

export default BudgetDashboard;
