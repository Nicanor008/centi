import { Button, Flex, Input, useMediaQuery, Divider } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaSearch } from "react-icons/fa";
import DataNotFound from "../../../../../../components/ErrorPages/DataNotFound";
import { getUserToken } from "../../../../../../helpers/getToken";
import { config } from "../../../../../../config";
import DataHeader from "../../../../../../components/Table/DataHeader";
import ShowAnalyticsLink from "../../../../../../components/ShowAnalyticsLink";
import BudgetDataTable from "./BudgetDataTable";
import BudgetFilterMenu from "./BudgetFilterMenu";
import BudgetDetailedAnalyticsNav from "./BudgetDetailedAnalyticsNav";

function ViewUserBudgets() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState({ filtered: false });
  const [manualRefresh, setManualRefresh] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  const userToken = getUserToken();

  const cachedBudget = useMemo(() => {
    if (!budget) return null;

    return {
      total: budget.total,
      data: budget.data,
      filtered: false,
    };
  }, [budget]);

  useEffect(() => {
    let payload = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${config.API_URL}/budget/`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(payload);
        setBudget(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, [manualRefresh]);

  const handleSearchChange = (text) => {
    setSearchText(text);
    if (text.trim() !== "") {
      const lowerCaseSearch = text.toLowerCase();
      const searchedBudgetData = budget.data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseSearch) ||
          item.description.toLowerCase().includes(lowerCaseSearch)
      );
      setBudget({
        data: searchedBudgetData,
        total: searchedBudgetData.length,
        filtered: false,
        search: true,
      });
    } else {
      setManualRefresh(true);
    }
  };

  return (
    <Flex flexDir="column">
      {/* header */}
      <DataHeader
        count={cachedBudget?.data?.length}
        title="Budget Tracker"
        subtitle="This is your budget history"
      >
        <Flex alignItems="center" gap={2}>
          {cachedBudget?.data?.length > 0 &&
            (!isLargerThan880 ? (
              <FaSearch />
            ) : (
              <Input
                placeholder="Search Budget ..."
                bg={"gray.100"}
                border="1px solid"
                borderColor="gray.300"
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                w="fit-content"
              />
            ))}
          <Button
            variant={!isLargerThan880 ? "ghost" : "primary"}
            onClick={() => navigate("/budget/add/1")}
            px={!isLargerThan880 ? 0 : 4}
          >
            {!isLargerThan880 ? <FaPlus /> : "Create Budget"}
          </Button>
          {cachedBudget?.data?.length > 0 && (
            <BudgetFilterMenu
              setManualRefresh={setManualRefresh}
              isFilter={budget?.filtered}
              setBudget={setBudget}
              budgetData={budget?.data}
            />
          )}
        </Flex>
      </DataHeader>

      <ShowAnalyticsLink
        count={cachedBudget?.total}
        title="Budget Analytics"
        link="/budget/analytics"
      />

      <Divider borderColor="gray.300" mt={2} />

      <BudgetDetailedAnalyticsNav data={cachedBudget?.data} />

      {/* data */}
      <BudgetDataTable data={cachedBudget?.data} />

      {cachedBudget?.data?.length < 1 ? <DataNotFound /> : <></>}
    </Flex>
  );
}

export default ViewUserBudgets;
