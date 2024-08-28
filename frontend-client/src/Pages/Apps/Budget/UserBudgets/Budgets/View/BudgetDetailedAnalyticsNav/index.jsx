import { Flex, Button, useMediaQuery, Text } from "@chakra-ui/react";
import React from "react";
import { formatNumberGroups } from "../../../../../../../helpers/formatNumberGroups";

const BudgetDetailedAnalyticsNav = ({ data, totalExpenses }) => {
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  return (
    data?.length > 0 && (
      <Flex alignItems="center" justifyContent="space-between" mt={4}>
        <Text>
          Total spent from{" "}
          <b>
            {data?.length > 0 &&
              new Date(data[data?.length - 1]?.createdAt).toDateString()}
          </b>{" "}
          is{" "}
          <b>
            KES.{" "}
            {formatNumberGroups(totalExpenses)}
          </b>
        </Text>
        {isLargerThan880 && (
          <Button variant="ghost" onClick={() => navigate("/budget/analytics")}>
            View Budget analytics
          </Button>
        )}
      </Flex>
    )
  );
};

export default BudgetDetailedAnalyticsNav;
