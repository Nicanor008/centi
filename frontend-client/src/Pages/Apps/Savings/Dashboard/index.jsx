import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataLoader } from "../../../../components";
import QuickBudgetAnalyticsNav from "../../../../components/Analytics/QuickBudgetAnalyticsNav";
import { config } from "../../../../config";
import { getUserToken } from "../../../../helpers/getToken";
import SavingsProgressChart from "./SavingsProgressChart";

function SavingsDashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState();
  const [loading, setLoading] = useState(true);
  const userToken = getUserToken();

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(`${config.API_URL}/savings`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setAnalytics(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
            Savings analytics
          </Text>
          <Text color="gray.500" fontWeight={400} fontSize={14}>
            Summary of your budget expenses and other related activity
          </Text>
        </Flex>
        <Button onClick={() => navigate("/savings/add")}>Add Savings</Button>
      </Flex>

      <Divider borderColor="gray.300" />

      {loading ? (
        <DataLoader />
      ) : (
        <>
          {/* body */}
          <Flex flexDir="column" my={(2, 8)}>
            <Flex justifyContent="left" flexWrap="wrap" gap={4} mb={(2, 8)}>
              <QuickBudgetAnalyticsNav
                title="Total Savings"
                amount={analytics?.data.reduce(
                  (acc, curr) => acc + curr.currentAmount,
                  0
                )}
              />
              <QuickBudgetAnalyticsNav
                title="No. of Savings"
                amount={analytics?.data?.length}
              />
            </Flex>

            <SavingsProgressChart analytics={analytics.data} />
          </Flex>

          {analytics?.total < 1 ? <DataNotFound /> : <></>}
        </>
      )}
    </Flex>
  );
}

export default SavingsDashboard;
