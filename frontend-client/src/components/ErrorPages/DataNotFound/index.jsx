import { Flex, Heading, Text } from "@chakra-ui/react";

const DataNotFound = ({ hideDescription = false, children }) => (
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
      Data not found
    </Heading>
    {!hideDescription && (
      <Text fontSize={14} w={["90%", "40%"]}>
        We couldn't find the specific data you are looking for at the moment.
        It's possible that the information is not available or hasn't been added
        yet. Please check back later or try a different search criteria.
      </Text>
    )}
    {children}
  </Flex>
);

export default DataNotFound;
