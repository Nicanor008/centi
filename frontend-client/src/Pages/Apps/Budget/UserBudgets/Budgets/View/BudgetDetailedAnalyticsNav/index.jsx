import { Flex, Button, useMediaQuery, Text } from "@chakra-ui/react";
import React from "react";
import { formatNumberGroups } from "../../../../../../../helpers/formatNumberGroups";

const BudgetDetailedAnalyticsNav = ({ data }) => {
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  return (
    data?.length > 0 && (
      <Flex alignItems="center" justifyContent="space-between">
        <Text>
          Total spent from{" "}
          <b>
            {data?.length > 0 &&
              new Date(data[data?.length - 1]?.createdAt).toDateString()}
          </b>{" "}
          is{" "}
          <b>
            KES.{" "}
            {formatNumberGroups(
              data?.reduce((acc, item) => acc + item.plannedExpenses, 0)
            )}
          </b>
        </Text>
        {isLargerThan880 && (
          <Button
            border="1px solid"
            borderColor="gray.400"
            color="gray.500"
            fontWeight={500}
            onClick={() => navigate("/budget/analytics")}
          >
            View Budget analytics
          </Button>
        )}
      </Flex>
    )
  );
};

export default BudgetDetailedAnalyticsNav;
