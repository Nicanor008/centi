import { Box, Flex, Heading, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function GetStartedToday() {
  const navigate = useNavigate()

  return (
    <Box as="section" bg="white" color="gray.800" py={10} px={6}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW={["100%", "80%"]}
        mx="auto"
        borderRadius="md"
        boxShadow="lg"
        p={8}
      >
        {/* Benefits Section */}
        <VStack
          spacing={5}
          align="start"
          flex="1"
          pr={{ md: 8 }}
          mb={{ base: 8, md: 0 }}
        >
          <Heading as="h2" size="xl" fontWeight="bold" fontFamily="inherit">
            Get Started Today
          </Heading>
          <Text fontSize="lg">
            Join Centi and take control of your finances with AI-powered budgeting,
            savings, and financial goal tracking. Experience the future of financial
            management in just a few clicks.
          </Text>
          <HStack spacing={3}>
            <Text fontSize="md" fontWeight="semibold">
              ✓ AI-Powered Budgets
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              ✓ Track Financial Goals
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              ✓ Save More, Worry Less
            </Text>
          </HStack>
        </VStack>

        {/* CTA Button */}
        <VStack flex="1" align={{ base: "center", md: "end" }}>
          <Button
            size="lg"
            // colorScheme="blue"
            // variant="solid"
            px={8}
            py={6}
            fontSize="lg"
            fontWeight="bold"
            // _hover={{ bg: "red.500" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up Now
          </Button>
          <Text fontSize="sm" mt={4}>
            Available on Web on all devices
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

export default GetStartedToday;
