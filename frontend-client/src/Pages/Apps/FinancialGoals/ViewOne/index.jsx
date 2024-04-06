import {
  Flex,
  Text,
  useMediaQuery,
  Link,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DataNotFound from "../../../../components/ErrorPages/DataNotFound";
import { getUserToken } from "../../../../helpers/getToken";
import { config } from "../../../../config";
import { DataLoader } from "../../../../components";
import QuickBudgetAnalyticsNav from "../../../../components/Analytics/QuickBudgetAnalyticsNav";
import AssociatedFinancialCard from "./AssociatedCard";
import { MdArrowBack } from "react-icons/md";

function ViewOneUserFinancialGoals() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
          <MdArrowBack onClick={() => navigate(-1)} cursor="pointer" />
          <Flex flexDir="column">
            <Text fontWeight={600} fontSize={16}>
              {location?.state?.name}
            </Text>
            {isLargerThan880 && (
              <Text color="gray.500" fontSize={12} fontWeight={400}>
                {location?.state?.description ??
                  "Live a happinness guaranteed life with the right goals"}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex flexDir="column" mr={[1, 10]}>
          <Text fontWeight={600} fontSize={16}>
            Dateline
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            {location?.state?.to}
          </Text>
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
              <Flex my={(3, 10)} flexDir={["column", "row"]} gap={4}>
                {/* {analytics?.budget?.length > 0 && ( */}
                <AssociatedFinancialCard title="Associated Budget">
                  {financialGoal.budget?.data[params.id]
                    ?.slice(-30)
                    ?.map((budget) => (
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
                    ))}
                </AssociatedFinancialCard>
                <AssociatedFinancialCard title="Associated Savings"></AssociatedFinancialCard>
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
