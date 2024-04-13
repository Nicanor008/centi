import { Box, Flex, Text, Button, Link } from "@chakra-ui/react";

const DashboardSectionWrapper = ({ title, titleUri, children }) => (
  <Box
    bg="gray.200"
    py={8}
    px={6}
    boxShadow="xl"
    borderRadius={8}
    w="fit-content"
  >
    <Flex justifyContent="space-between" mb={2} alignItems="center">
      <Text mb={2} fontWeight={700}>
        {title}
      </Text>
      <Link href={titleUri}>
        <Button variant="ghost" ml={4}>
          Create {title}
        </Button>
      </Link>
    </Flex>
    {children}
  </Box>
);

export default DashboardSectionWrapper;
