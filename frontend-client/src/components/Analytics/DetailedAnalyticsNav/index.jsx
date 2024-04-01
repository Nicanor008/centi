import { Button, Flex, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import QuickBudgetAnalyticsNav from "../QuickBudgetAnalyticsNav";

const DetailedAnalyticsNav = (data, plannedExpense) => {
  const navigate = useNavigate();
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  return (
    data?.length > 0 && (
      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap={4}>
          <QuickBudgetAnalyticsNav
            title="Total Expenses"
            amount={data?.reduce((acc, item) => acc + item.plannedExpenses, 0)}
          />
          <QuickBudgetAnalyticsNav
            title="Total Planned Expenses"
            amount={plannedExpense}
          />
        </Flex>
        {isLargerThan880 && (
          <Button
            border="1px solid"
            borderColor="gray.400"
            color="gray.500"
            fontWeight={500}
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
