import { Button, Flex, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import QuickBudgetAnalyticsNav from "../QuickBudgetAnalyticsNav";

const DetailedAnalyticsNav = ({ data, plannedExpense }) => {
  const navigate = useNavigate();
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  return (
    data?.length > 0 && (
      <Flex justifyContent="space-between" alignItems="center" my={4}>
        <Flex gap={4}>
        <QuickBudgetAnalyticsNav
            title="Total Allocated Budget"
            amount={plannedExpense}
          />
          <QuickBudgetAnalyticsNav
            title="Total Expenses"
            amount={data?.reduce((acc, item) => Number(acc) + Number(item.actualExpenses), 0)}
          />
          {/* <QuickBudgetAnalyticsNav
            title="Total Planned Expenses"
            amount={data?.plannedExpense}
          /> */}
        </Flex>
        {isLargerThan880 && (
          <Button
            variant="secondary"
            onClick={() => navigate("/budget/analytics")}
          >
            Detailed analytics
          </Button>
        )}
      </Flex>
    )
  );
};

export default DetailedAnalyticsNav;
