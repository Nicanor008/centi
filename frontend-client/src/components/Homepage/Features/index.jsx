import { Box, chakra, Grid, GridItem, Container, Flex } from "@chakra-ui/react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { SiMoneygram } from "react-icons/si";

const Feature = ({ heading, text, icon }) => {
  return (
    <GridItem>
      <Flex alignItems="center">
        {icon}
        <chakra.h3 fontSize="xl" fontWeight="600" ml={2}>
          {heading}
        </chakra.h3>
      </Flex>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

export default function HomepageFeatures() {
  return (
    <Box as={Container} maxW="7xl" mt={14} p={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={{ base: "8", sm: "12", md: "16" }}
      >
        <Feature
          heading="Smart Budgeting"
          icon={<GiReceiveMoney color="gray" />}
          text="Easily create and manage your budgets with our user-friendly interface. Track your expenses, set spending limits, and gain insights into your financial habits."
        />
        <Feature
          heading="Expense Tracking"
          icon={<SiMoneygram color="gray" />}
          text="Effortlessly monitor your spending patterns and identify areas where you can save. Categorize expenses, view transaction history, and make informed financial decisions"
        />
        <Feature
          heading="Smart Savings Goals"
          icon={<GrMoney color="gray" />}
          text="Set personalized savings goals and watch your progress in real-time. Our smart savings feature helps you stay on track and reach your targets faster."
        />
        <Feature
          heading="AI Generated Budgets"
          icon={<FaMoneyBillTrendUp color="gray" />}
          text="Harness the power of generative AI to create optimized budgets tailored to your lifestyle and financial objectives."
        />
      </Grid>
    </Box>
  );
}
