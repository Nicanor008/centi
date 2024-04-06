import { Button, Flex, Link } from "@chakra-ui/react";

const NoAssociatedData = ({ link, name }) => (
  <Flex w="100%" justifyContent="center" mt={4}>
    <Link href={link}>
      <Button variant="secondary">{name}</Button>
    </Link>
  </Flex>
);

export default NoAssociatedData;
