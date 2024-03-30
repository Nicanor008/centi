import { Flex, Text } from "@chakra-ui/react";
import { Chart as ReactChartJs } from "react-chartjs-2";
import "chart.js/auto";

const NumberofBudgetItems = ({ analytics }) => {
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
            <ReactChartJs type="line" data={data} options={options} />
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default NumberofBudgetItems;
