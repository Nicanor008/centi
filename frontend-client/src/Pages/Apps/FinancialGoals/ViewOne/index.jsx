import { Flex, Text, Link, Button, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DataNotFound from "../../../../components/ErrorPages/DataNotFound";
import { getUserToken } from "../../../../helpers/getToken";
import { config } from "../../../../config";
import { DataLoader } from "../../../../components";
import QuickBudgetAnalyticsNav from "../../../../components/Analytics/QuickBudgetAnalyticsNav";
import AssociatedFinancialCard from "./AssociatedCard";
import NoAssociatedData from "./NoAssociatedData";
import ViewFinancialGoalHeader from "./Header";

function ViewOneUserFinancialGoals() {
  const params = useParams();
  const location = useLocation();
  const [financialGoal, setFinancialGoal] = useState({
    filtered: false,
    loading: true,
  });
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
        setFinancialGoal([]);
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  const budgetKey = financialGoal.budget?.data[params.id];
  const savingsKey = financialGoal.savings?.data[params.id];
  const totalBudgetExpensesCount = budgetKey?.reduce(
    (acc, curr) => acc + curr.budgetItemsCount,
    0
  );

  return (
    <Flex flexDir="column">
      {/* header */}
      <ViewFinancialGoalHeader data={location?.state} />

      {financialGoal?.loading ? (
        <DataLoader />
      ) : (
        <>
          {(budgetKey || savingsKey) && (
            <>
              <Flex justifyContent="left" flexWrap="wrap" gap={2}>
                {budgetKey && (
                  <Flex gap={2}>
                    <QuickBudgetAnalyticsNav
                      title="No. of Budget"
                      amount={budgetKey?.length}
                      hasCurrency={false}
                    />
                    <QuickBudgetAnalyticsNav
                      title="No. of Expenses"
                      amount={totalBudgetExpensesCount}
                      hasCurrency={false}
                    />
                  </Flex>
                )}
                {savingsKey && (
                  <Flex gap={2}>
                    <QuickBudgetAnalyticsNav
                      title="No. of Savings"
                      amount={savingsKey?.length}
                      hasCurrency={false}
                    />
                  </Flex>
                )}
              </Flex>

              <Flex my={(3, 10)} flexDir={["column", "row"]} gap={4}>
                <AssociatedFinancialCard
                  title={`${!budgetKey ? "No" : ""} Associated Budget`}
                >
                  {budgetKey ? (
                    budgetKey?.slice(-30)?.map((budget) => (
                      <Flex key={budget._id} flexDir="column">
                        <Flex justifyContent="space-between" py={2}>
                          <Text>
                            {budget.name.length > 40
                              ? budget.name.substring(0, 40) + "..."
                              : budget.name}
                          </Text>
                          <Text ml={(2, 6)}>Total expenses amount</Text>
                        </Flex>
                        <Divider borderColor="gray.200" />
                      </Flex>
                    ))
                  ) : (
                    <NoAssociatedData
                      name="Create Budget"
                      link="/budget/add/1"
                    />
                  )}
                </AssociatedFinancialCard>
                <AssociatedFinancialCard
                  title={`${!savingsKey ? "No" : ""} Associated Savings`}
                >
                  {savingsKey ? (
                    savingsKey?.slice(-30)?.map((saving) => (
                      <Flex key={saving._id} flexDir="column">
                        <Flex justifyContent="space-between" py={2}>
                          <Text>
                            {saving.savingsGoalName?.length > 40
                              ? saving.savingsGoalName.substring(0, 40) + "..."
                              : saving.savingsGoalName}
                          </Text>
                          <Text ml={(2, 6)}>{saving?.currentAmount}</Text>
                        </Flex>
                        <Divider borderColor="gray.200" />
                      </Flex>
                    ))
                  ) : (
                    <NoAssociatedData
                      name="Create a Saving Goal"
                      link="/savings/add"
                    />
                  )}
                </AssociatedFinancialCard>
              </Flex>
            </>
          )}
          {!budgetKey && !savingsKey ? (
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
