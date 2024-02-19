import Footer from "./components/common/Footer";
import Navbar from "./components/common/nav";
import HomepageFeatures from "./components/Homepage/Features";
import Hero from "./components/Homepage/Hero";
// import Navbar from "./components/common/nav";

function App() {
  return (
    <>
      {/* Navbar -> reusable component */}
      <Navbar />
      {/* --------END OF NAVBAR */}

      {/* Hero */}
      <Hero />

      {/* features */}
      <HomepageFeatures />

      {/* footer */}
      <Footer />
    </>
  );
}

export default App;
