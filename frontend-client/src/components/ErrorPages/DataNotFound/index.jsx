import { Flex, Heading, Text } from "@chakra-ui/react";

const DataNotFound = () => (
  <Flex
    flexDir="column"
    textAlign="center"
    w={["100%", "50%"]}
    justifyContent="center"
    alignItems="center"
    gap={2}
  >
    <Heading as="h5" fontWeight={600} fontSize={22} fontFamily="inherit">
      Data not found
    </Heading>
    <Text fontSize={14}>
      We couldn't find the specific data you are looking for at the moment. It's
      possible that the information is not available or hasn't been added yet.
      Please check back later or try a different search criteria.
    </Text>
  </Flex>
);

export default DataNotFound;
