import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataHeader from "../../../../components/Table/DataHeader";
import { DataLoader } from "../../../../components";
import DataNotFound from "../../../../components/ErrorPages/DataNotFound";
import { config } from "../../../../config";
import FormatAIGeneratedBudgetItem from "./FormatAIGeneratedBudgetItem";

function ViewAIGeneratedBudget() {
  const [budget, setBudget] = useState({ filtered: false, loading: true });

  const cachedBudget = useMemo(() => {
    if (!budget) return null;
    return {
      ...budget,
      total: budget.total,
      data: budget.data,
      filtered: false,
    };
  }, [budget])
  const navigate = useNavigate()

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(`${config.API_URL}/generate-budget`);

        setBudget({ budget: response.data.data, loading: false });
      } catch (error) {
        setBudget({ loading: false });
        console.log(error);
      }
    }

    makeRequest();
  }, [])

  // const handleSearchChange = (text) => {
  //   setBudget({ loading: true });
  //   setSearchText(text);
  //   if (text.trim() !== "") {
  //     const lowerCaseSearch = text.toLowerCase();
  //     const searchedBudgetData = budget.data.filter(
  //       (item) =>
  //         item.name.toLowerCase().includes(lowerCaseSearch) ||
  //         item.description.toLowerCase().includes(lowerCaseSearch)
  //     );
  //     setBudget({
  //       data: searchedBudgetData,
  //       total: searchedBudgetData.length,
  //       filtered: false,
  //       search: true,
  //       loading: false,
  //     });
  //   } else {
  //     setManualRefresh(true);
  //   }
  // };

  return (
    <Flex flexDir="column">
      {/* header */}
      <DataHeader
        count={cachedBudget?.total}
        title="AI Generated Budget"
        subtitle="This is your ai generated budget history"
      >
        <Flex alignItems="center" gap={2}>
          {/* {cachedBudget?.data?.length > 0 &&
            (!isLargerThan880 ? (
              <FaSearch />
            ) : (
              <Input
                placeholder="Search Budget ..."
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                w="fit-content"
              />
            ))} */}
          <Button
            variant="primary"
            onClick={() => navigate("/generate-budget/new")}
          >
            Generate Budget
          </Button>
          {/* {cachedBudget?.data?.length > 0 && (
            <BudgetFilterMenu
              setManualRefresh={setManualRefresh}
              isFilter={budget?.filtered}
              setBudget={setBudget}
              budgetData={budget?.data}
            />
          )} */}
        </Flex>
      </DataHeader>

      {budget?.loading ? (
        <DataLoader />
      ) : (
        <>
          {cachedBudget?.budget.data.map((data) => (
            <Flex key={data.id} flexDir="column" width="max-content" bg="white" w="80%" m={4} gap={3} p={4} borderRadius={6} boxShadow="lg">
              <Flex flexDir="column" alignItems="start" justifyContent="space-between" gap={2}>
                <Flex fontSize="md" gap={2}><Text fontWeight="bold">Budget Amount:</Text> {data?.userBudget ?? data?.budget}</Flex>
                <Flex fontSize="md" gap={2}><Text fontWeight="bold">Prompt description:</Text> {data?.userDescription ?? data?.description}</Flex>
                <Text fontWeight="bolder" fontSize="md" mt={5}>AI Generated Budget:</Text>
                <FormatAIGeneratedBudgetItem data={data.generatedBudget.message.content} />
              </Flex>
            </Flex>
          ))}

          {cachedBudget?.data?.length < 1 ? <DataNotFound /> : <></>}
        </>
      )}
    </Flex>
  );
}

export default ViewAIGeneratedBudget;
