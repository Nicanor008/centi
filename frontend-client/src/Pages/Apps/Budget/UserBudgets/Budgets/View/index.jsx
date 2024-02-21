import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ViewUserBudgets() {
  const navigate = useNavigate();
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
        <Flex flexDir="column">
          <Text fontWeight={600} fontSize={16}>
            Budget Tracker
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            This is your budget history
          </Text>
        </Flex>

        <Flex mr={[0, 8]}>
          <Button mr={3}>Search</Button>
          <Button
            bg="red.400"
            color="white"
            onClick={() => navigate("/budget/add")}
          >
            Create Budget
          </Button>
        </Flex>
      </Flex>
      {/* view all budgets - content */}
      View All budgets Content
    </Flex>
  );
}

export default ViewUserBudgets;
