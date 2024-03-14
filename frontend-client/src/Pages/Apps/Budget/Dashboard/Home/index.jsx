import { Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickBudgetAnalyticsNav from "../../../../../components/Analytics/QuickBudgetAnalyticsNav";

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

  console.log(analytics);

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
        <Flex justifyContent="space-between">
          <QuickBudgetAnalyticsNav
            title="Total Expenses"
            amount={analytics?.totalBudgetExpensesAmount}
          />
          <QuickBudgetAnalyticsNav
            title="Total Expenses(This month)"
            amount={analytics?.totalPlannedExpensesThisMonth}
          />
          <QuickBudgetAnalyticsNav
            title="Total No. Expenses"
            amount={analytics?.totalNumberofBudgetItems}
            hasCurrency={false}
          />
          <QuickBudgetAnalyticsNav
            title="No. Expenses(This month)"
            amount={analytics?.totalNumberofBudgetThisMonth}
            hasCurrency={false}
          />
          <QuickBudgetAnalyticsNav
            title="Total No. Budget"
            amount={analytics?.totalNumberofBudget}
            hasCurrency={false}
          />
        </Flex>

        {/* charts */}

        {/* overview */}
      </Flex>
    </Flex>
  );
}

export default BudgetDashboard;
