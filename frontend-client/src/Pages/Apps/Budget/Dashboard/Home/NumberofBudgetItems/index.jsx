import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Chart as ReactChartJs } from "react-chartjs-2";
import "chart.js/auto";

const NumberofBudgetItems = () => {
  const [analytics, setAnalytics] = useState();

  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current?.chartInstance?.destroy();
      }
    };
  }, []);

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/v1/budget/dashboard/analytics"
        );
        setAnalytics(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  const data = analytics?.budget && {
    labels: analytics?.budget?.map((item) => item.budgetItemsCount),
    datasets: [
      {
        label: "Budget items",
        data: analytics?.budget?.map((item) => item.budgetItemsCount), // Planned expenses data for each budget
        backgroundColor: "green", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      grid: { display: false },
      title: {
        display: true,
        text: "No. of Budget Expenses",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "No.",
        },
        grid: { display: false },
      },
      x: {
        title: {
          display: false,
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
            The No. of Budget expenses
          </Text>

          {analytics?.budget?.length > 0 && (
            <ReactChartJs
              type="line"
              ref={chartRef}
              data={data}
              options={options}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default NumberofBudgetItems;
