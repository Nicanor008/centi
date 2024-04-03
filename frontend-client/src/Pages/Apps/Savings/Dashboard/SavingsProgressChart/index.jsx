import { Flex, Text } from "@chakra-ui/react";
import { Chart as ReactChartJs } from "react-chartjs-2";
import "chart.js/auto";

const SavingsProgressChart = ({ analytics }) => {
  const data = analytics && {
    labels: analytics?.map((item) => new Date(item?.createdAt).toDateString()),
    datasets: [
      {
        label: "Savings",
        data: analytics.map((item) => item.currentAmount), // Planned expenses data for each budget
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
        text: "Periodic Savings",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Amount Saved",
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
      {analytics?.length > 0 && (
        <Flex
          flexDir="column"
          gap={6}
          style={{ width: "600px", height: "400px" }}
        >
          {/* <Text textAlign="center" fontWeight={600} fontSize={18}>
            Savings
          </Text> */}

          {analytics?.length > 0 && (
            <ReactChartJs type="line" data={data} options={options} />
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default SavingsProgressChart;
