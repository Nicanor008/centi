import { Divider, Flex, Text } from "@chakra-ui/react";

function CentiDashboard() {
  // const [analytics, setAnalytics] = useState();
  // const userToken = getUserToken();

  // useEffect(() => {
  //   async function makeRequest() {
  //     try {
  //       const response = await axios.get(
  //         `${config.API_URL}/budget/analytics/analytics`,
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
            Dashboard
          </Text>
          <Text color="gray.500" fontWeight={400} fontSize={14}>
            Summary of your your financials
          </Text>
        </Flex>
        {/* TODO: Add filters here */}
        <Text>Filters go here</Text>
      </Flex>

      <Divider borderColor="gray.300" />

      {/* body */}
      <Flex flexDir="column" my={(2, 8)}></Flex>
    </Flex>
  );
}

export default CentiDashboard;
