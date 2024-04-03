import { Flex, Spinner } from "@chakra-ui/react";

const DataLoader = () => {
  return (
    <Flex
      justify="center"
      align="center"
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      zIndex="9999"
      bg="rgba(255, 255, 255, 0.8)"
    >
      <Spinner size="xl" color="blue.500" />
    </Flex>
  );
};

export default DataLoader;
