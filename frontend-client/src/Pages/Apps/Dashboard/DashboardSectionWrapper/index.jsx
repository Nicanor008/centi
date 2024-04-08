import { Box, Text } from "@chakra-ui/react";

const DashboardSectionWrapper = ({ title, children }) => (
  <Box
    bg="gray.200"
    py={8}
    px={6}
    boxShadow="xl"
    borderRadius={8}
    w="fit-content"
  >
    <Text mb={2} fontWeight={700}>
      {title}
    </Text>
    {children}
  </Box>
);

export default DashboardSectionWrapper;
