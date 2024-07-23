import HomepageFeatures from "../../components/Homepage/Features";
import Hero from "../../components/Homepage/Hero";
import InfoBanner from "../../assets/budgeting-made-simple.png";
import { Image } from "@chakra-ui/react";
import FAQ from "../../components/Homepage/FAQ";

function Homepage() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* features */}
      <HomepageFeatures />
    
      <Image
        alt={"Hero Image"}
        fit={"cover"}
        align={"center"}
        src={InfoBanner}
        w="100vw"
      />

      {/* FAQ */}
      <FAQ />
    </>
  );
}

export default Homepage;
