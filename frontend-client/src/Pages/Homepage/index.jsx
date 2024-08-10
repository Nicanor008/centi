import HomepageFeatures from "../../components/Homepage/Features";
import Hero from "../../components/Homepage/Hero";
import InfoBanner from "../../assets/budget-ai-compare.svg";
import { Box, Image, Text, Heading, VStack } from "@chakra-ui/react";
import FAQ from "../../components/Homepage/FAQ";
import GetStartedToday from "../../components/Homepage/GetStartedToday";
import Slideshow from "../../components/Homepage/Slideshow";

function Homepage() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Features */}
      <Slideshow />
      <HomepageFeatures />

      {/* Comparison Banner */}
      <Box textAlign="center" py={10} bg="gray.50">
        <Heading as="h2" size="xl" mb={4} fontFamily="inherit">
          Budget Smarter with AI
        </Heading>
        <VStack spacing={4} align="center">
          <Text fontSize="lg" maxW={["90%", "50%"]}>
            See how AI can help you create a more efficient and effective budget compared to doing it manually. 
            Our AI analyzes your spending habits and financial goals to generate a personalized budget that maximizes your savings.
          </Text>
          <Image
            alt={"AI vs User Budget Comparison"}
            fit={"cover"}
            align={"center"}
            src={InfoBanner}
            w="80%"
          />
        </VStack>
      </Box>

      {/* Get started */}
      <GetStartedToday />

      {/* FAQ */}
      {/* <FAQ /> */}
    </>
  );
}

export default Homepage;
