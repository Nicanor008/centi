import { Box, Flex, Text } from "@chakra-ui/react";
import { formatNumberGroups } from "../../../helpers/formatNumberGroups";

const QuickBudgetAnalyticsNav = ({ title, amount, hasCurrency = true }) => (
  <Box bg="white" p="10px 15px" borderRadius={6} boxShadow="md">
    <Flex alignItems="center">
      {hasCurrency && (
        <Text fontSize={12} color="gray.600">
          KES.
        </Text>
      )}
      <Text fontWeight={600} px={1} fontSize={20}>
        {formatNumberGroups(amount)}
      </Text>
    </Flex>
    <Text fontSize={14} fontWeight={400} color="gray.600">
      {title}
    </Text>
  </Box>
);

export default QuickBudgetAnalyticsNav;
