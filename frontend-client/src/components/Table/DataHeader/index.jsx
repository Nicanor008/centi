import { Flex, Box, Text, useMediaQuery } from "@chakra-ui/react";

const DataHeader = ({ count, title, subtitle, children }) => {
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex alignItems="center" gap={2}>
        {count ? (
          <Text bg="gray.300" p="2px 8px" borderRadius="full" fontWeight="bold">
            {count}
          </Text>
        ) : (
          <Box />
        )}
        <Flex flexDir="column">
          <Text fontWeight={600} fontSize={16}>
            {title}
          </Text>
          {isLargerThan880 && (
            <Text color="gray.500" fontSize={12} fontWeight={400}>
              {subtitle}
            </Text>
          )}
        </Flex>
      </Flex>

      {children}
    </Flex>
  );
};

export default DataHeader;
