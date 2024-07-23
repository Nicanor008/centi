import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../nav";

function Layout() {
  return (
    <Flex minW="100vw" minH="100vh" overflow="hidden" bg="white">
      <Flex
        w={["100vw", "96vw"]}
        flexDir="column"
        marginInlineEnd={0}
        marginInlineStart={0}
      >
        {/* nav */}
        <Navbar />

        {/* main/children */}
        <Flex minH="80vh" pt={[2, 8]} flexDir="column" w="100vw">
          <Outlet />
        </Flex>

        {/* footer */}
        <Footer />
      </Flex>
    </Flex>
  );
}

export default Layout;
