import { Flex, Heading, Text } from "@chakra-ui/react";

const PageNotFound = ({ hideDescription = false, children }) => (
  <Flex
    flexDir="column"
    textAlign="center"
    minW="100%"
    justifyContent="center"
    alignItems="center"
    gap={2}
    minH={`calc(100vh - 30vh)`}
  >
    <Heading as="h5" fontWeight={600} fontSize={22} fontFamily="inherit">
      404
    </Heading>
    <Heading as="h5" fontWeight={600} fontSize={20} fontFamily="inherit">
      Page Not Found
    </Heading>
    {!hideDescription && (
      <Text fontSize={14} w={["90%", "40%"]}>
        Sorry, this page does not exist
      </Text>
    )}
    {children}
  </Flex>
);

export default PageNotFound;
