import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Flex minW="100vw" minH="100vh" overflow="hidden" bg="white">
      <Flex w={["100vw", "96vw"]} flexDir="column" my={[0, 4]} mx={[0, 8]}>
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default Layout;
