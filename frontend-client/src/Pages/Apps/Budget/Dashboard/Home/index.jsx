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
          border="1px solid"
          borderColor="gray.300"
          onClick={() => navigate("/budget/add/1")}
          fontWeight={400}
        >
          Add Budget
        </Button>
      </Flex>

      <Divider borderColor="gray.300" />

      {/* body */}
      <Flex flexDir="column" my={(2, 8)}>
        {/* cards */}
        <Flex justifyContent="space-between" flexWrap="wrap">
          {analytics?.totalBudgetExpensesAmount && (
            <QuickBudgetAnalyticsNav
              title="Expenses"
              amount={analytics?.totalBudgetExpensesAmount}
            />
          )}
          {analytics?.totalPlannedExpensesThisMonth && (
            <QuickBudgetAnalyticsNav
              title="Expenses(This month)"
              amount={analytics?.totalPlannedExpensesThisMonth}
            />
          )}
          {analytics?.totalNumberofBudgetItems && (
            <QuickBudgetAnalyticsNav
              title="No. Expenses"
              amount={analytics?.totalNumberofBudgetItems}
              hasCurrency={false}
            />
          )}
          {analytics?.totalNumberofBudgetThisMonth && (
            <QuickBudgetAnalyticsNav
              title="No. Expenses(This month)"
              amount={analytics?.totalNumberofBudgetThisMonth}
              hasCurrency={false}
            />
          )}
          {analytics?.totalNumberofBudget && (
            <QuickBudgetAnalyticsNav
              title="No. Budget"
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
        {/* budget items overview */}
      </Flex>
    </Flex>
  );
}

export default BudgetDashboard;
