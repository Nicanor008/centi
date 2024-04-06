import { Flex, Text, useMediaQuery, Link, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataNotFound from "../../../../components/ErrorPages/DataNotFound";
import { getUserToken } from "../../../../helpers/getToken";
import { config } from "../../../../config";
import { DataLoader } from "../../../../components";
import QuickBudgetAnalyticsNav from "../../../../components/Analytics/QuickBudgetAnalyticsNav";

function ViewOneUserFinancialGoals() {
  const params = useParams();
  const [financialGoal, setFinancialGoal] = useState({
    filtered: false,
    loading: true,
  });
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");
  const userToken = getUserToken();

  useEffect(() => {
    let payload = {
      method: "get",
      url: `${config.API_URL}/financial-goals/group/all/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(payload);
        setFinancialGoal(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  const totalBudgetExpensesCount = financialGoal.budget?.data[
    params.id
  ]?.reduce((acc, curr) => acc + curr.budgetItemsCount, 0);

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
          {/* {cachedGoals?.total > 0 ? (
            <Text
              bg="gray.300"
              p="2px 8px"
              borderRadius="full"
              fontWeight="bold"
            >
              {cachedGoals?.total}
            </Text>
          ) : (
            <Box />
          )} */}
          <Flex flexDir="column">
            <Text fontWeight={600} fontSize={16}>
              Financial goals
            </Text>
            {isLargerThan880 && (
              <Text color="gray.500" fontSize={12} fontWeight={400}>
                Live a happinness guaranteed life with the right goals
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>

      {financialGoal?.loading ? (
        <DataLoader />
      ) : (
        <>
          {financialGoal.budget?.data[params.id] && (
            <>
              <Flex justifyContent="left" flexWrap="wrap" gap={2}>
                <QuickBudgetAnalyticsNav
                  title="No. of Budget"
                  amount={financialGoal.budget?.data[params.id]?.length}
                  hasCurrency={false}
                />
                <QuickBudgetAnalyticsNav
                  title="No. of Expenses"
                  amount={totalBudgetExpensesCount}
                  hasCurrency={false}
                />
              </Flex>
            </>
          )}
          {!financialGoal.budget?.data[params.id] ? (
            <Flex flexDir="column">
              <DataNotFound hideDescription={true}>
                This Financial Goal Doesn't have any budget or savings
                associated with
                {/* TODO: Can you attach an existing goal directly??*/}
                <Flex gap={2}>
                  <Link href="/budget/add/1">
                    <Button>Create Budget</Button>
                  </Link>
                  <Link href="/savings/add">
                    <Button variant="secondary">Create a Saving Goal</Button>
                  </Link>
                </Flex>
              </DataNotFound>
            </Flex>
          ) : (
            <></>
          )}
        </>
      )}
    </Flex>
  );
}

export default ViewOneUserFinancialGoals;
