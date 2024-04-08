import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import QuickBudgetAnalyticsNav from "../../../components/Analytics/QuickBudgetAnalyticsNav";
import { config } from "../../../config";
import { getUserToken } from "../../../helpers/getToken";
import DashboardSectionWrapper from "./DashboardSectionWrapper";

function CentiDashboard() {
  const [analytics, setAnalytics] = useState();
  const userToken = getUserToken();

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(`${config.API_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
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
        <Flex flexDir="column" w="fit-content">
          <Text fontWeight={600} fontSize={20}>
            Dashboard
          </Text>
          <Text color="gray.500" fontWeight={400} fontSize={14}>
            Summary of your your financials
          </Text>
        </Flex>
      </Flex>

      <Divider borderColor="gray.300" />

      {/* body */}
      <Flex flexDir="column" my={(2, 8)}>
        <Flex flexDir="column" gap={8}>
          <DashboardSectionWrapper title="Budget">
            <Flex gap={6}>
              <QuickBudgetAnalyticsNav
                title="Total Budget Expenses"
                amount={analytics?.budget.totalBudgetExpensesAmount}
              />
              <QuickBudgetAnalyticsNav
                title="Expenses this month"
                amount={analytics?.budget.totalPlannedExpensesThisMonth}
              />
              <QuickBudgetAnalyticsNav
                title="No. of Expenses"
                amount={analytics?.budget.totalNumberofBudgetItems}
                hasCurrency={false}
              />
            </Flex>
          </DashboardSectionWrapper>
          <DashboardSectionWrapper title="Savings">
            <Flex gap={6}>
              <QuickBudgetAnalyticsNav
                title="Total Savings"
                amount={analytics?.savings.totalSavingsAmount}
              />
              <QuickBudgetAnalyticsNav
                title="No. of Savings Goals"
                amount={analytics?.savings.total}
                hasCurrency={false}
              />
            </Flex>
          </DashboardSectionWrapper>
          <DashboardSectionWrapper title="Financial Goals">
            <Flex justifyContent="left" flexWrap="wrap" gap={6}>
              <QuickBudgetAnalyticsNav
                title="No. of Goals"
                amount={analytics?.financialGoal.total}
                hasCurrency={false}
              />
              <QuickBudgetAnalyticsNav
                title="Total Target Goal"
                amount={analytics?.financialGoal.totalFinancialGoalTargetAmount}
              />
            </Flex>
          </DashboardSectionWrapper>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CentiDashboard;
