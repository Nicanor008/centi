import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function SavingsDashboard() {
  const navigate = useNavigate();
  // const [analytics, setAnalytics] = useState();
  // const userToken = getUserToken();

  // useEffect(() => {
  //   async function makeRequest() {
  //     try {
  //       const response = await axios.get(
  //         `${config.API_URL}/budget/dashboard/analytics`,
  //         { headers: { Authorization: `Bearer ${userToken}` } }
  //       );
  //       setAnalytics(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   makeRequest();
  // }, []);

  return (
    <Flex flexDir="column">
      {/* header/title */}
      <Flex mb={2} justifyContent="space-between">
        <Flex flexDir="column" w="fit-content">
          <Text fontWeight={600} fontSize={20}>
            Savings analytics
          </Text>
          <Text color="gray.500" fontWeight={400} fontSize={14}>
            Summary of your budget expenses and other related activity
          </Text>
        </Flex>
        <Button
          w="fit-content"
          bg="red.400"
          color="white"
          onClick={() => navigate("/savings/add")}
          _hover={{
            bg: "red.400",
          }}
        >
          Add Savings
        </Button>
      </Flex>

      <Divider borderColor="gray.300" />

      {/* body */}
      <Flex flexDir="column" my={(2, 8)}></Flex>
    </Flex>
  );
}

export default SavingsDashboard;
