import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Chart as ReactChartJs } from "react-chartjs-2";
import "chart.js/auto";
import { getMonthName } from "../../../../../../helpers/getMonths";

const PlannedIncomeAndExpenseChart = () => {
  const [analytics, setAnalytics] = useState();

  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.chartInstance.destroy();
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
        display: true,
        text: "Expenses Analytics",
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
      <div style={{ width: "600px", height: "400px" }}>
        {analytics?.budget?.length > 0 && (
          <ReactChartJs
            type="bar"
            ref={chartRef}
            data={data}
            options={options}
          />
        )}
      </div>
    </Flex>
  );
};

export default PlannedIncomeAndExpenseChart;