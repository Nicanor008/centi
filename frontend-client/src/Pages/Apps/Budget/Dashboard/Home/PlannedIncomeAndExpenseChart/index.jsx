import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Chart as ReactChartJs } from "react-chartjs-2";
import "chart.js/auto";
import { getMonthName } from "../../../../../../helpers/getMonths";
import { getUserToken } from "../../../../../../helpers/getToken";
import { config } from "../../../../../../config";

const PlannedIncomeAndExpenseChart = () => {
  const [analytics, setAnalytics] = useState();
  const userToken = getUserToken();

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(
          `${config.API_URL}/budget/analytics/analytics`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        setAnalytics(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  const data = analytics?.budget && {
    labels: analytics?.budget
      ?.slice(-15)
      ?.map(
        (item) =>
          `${new Date(item.createdAt).getDate()}/${new Date(
            item.createdAt
          ).getMonth()}`
      ), // Example labels
    datasets: [
      {
        label: "Planned Income",
        data: analytics?.budget?.map((item) => item.plannedIncome), // Planned expenses data for each budget
        backgroundColor: "green", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
      {
        label: "Planned Expenses",
        data: analytics?.budget
          ?.slice(-15)
          ?.map((item) => item.plannedExpenses), // Planned expenses data for each budget
        backgroundColor: "red", // Bar color
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      grid: { display: false },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Amount",
        },
        grid: { display: false },
      },
      x: {
        title: {
          display: true,
          text:
            analytics?.budget.length > 0
              ? getMonthName(
                  new Date(
                    analytics?.budget[analytics.budget.length - 1].createdAt
                  ).getMonth()
                )
              : "Budget",
        },
        grid: { display: false },
      },
    },
  };

  return (
    <Flex>
      {analytics?.budget?.length > 0 && (
        <Flex
          flexDir="column"
          gap={6}
          style={{ width: "600px", height: "400px" }}
        >
          <Text textAlign="center" fontWeight={600} fontSize={18}>
            Expenses Analytics
          </Text>
          <ReactChartJs type="bar" data={data} options={options} />
        </Flex>
      )}
    </Flex>
  );
};

export default PlannedIncomeAndExpenseChart;
