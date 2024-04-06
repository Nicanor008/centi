import { Flex, Text } from "@chakra-ui/react";

const AssociatedFinancialCard = ({ title, children }) => (
  <Flex
    border="1px solid"
    borderColor="gray.200"
    bg="white"
    flexDir="column"
    p={6}
    boxShadow="md"
    borderRadius={8}
    w={["98%", "48%"]}
  >
    <Text
      py={2}
      bg="gray.50"
      borderRadius={4}
      fontWeight={800}
      textAlign="center"
    >
      {title}
    </Text>
    {children}
  </Flex>
);

export default AssociatedFinancialCard;
