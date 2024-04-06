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
    <Flex bg="gray.50" px={[1, 2]} py={2}>
      <Text py={2} borderRadius={4} fontWeight={800} w="100%">
        {title}
      </Text>
    </Flex>
    {children}
  </Flex>
);

export default AssociatedFinancialCard;
