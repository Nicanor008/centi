import {
  Button,
  Flex,
  Input,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaEye, FaSearch } from "react-icons/fa";
import { getUserToken } from "../../../../../helpers/getToken";
import { config } from "../../../../../config";
import DataHeader from "../../../../../components/Table/DataHeader";
import BudgetItemsDataTable from "./BudgetItemsDataTable";
import DataNotFoundWithChildren from "./DataNotFoundWithChildren";
import BudgetItemsFilterData from "./BudgetItemsDataTable/BudgetItemsFilterData";
import DetailedAnalyticsNav from "../../../../../components/Analytics/DetailedAnalyticsNav";
import { ConfirmDeleteModal } from "../../../../../components";

function ViewUserBudgetItems() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState();
  const [budgetItems, setBudgetItems] = useState({ filtered: false });
  const { budgetId } = useParams();
  const [manualRefresh, setManualRefresh] = useState(false);
  const {
    isOpen: isOpenDeletePrompt,
    onOpen: openDeletePrompt,
    onClose: onCloseDeletePrompt,
  } = useDisclosure();

  const [searchText, setSearchText] = useState("");

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");
  const userToken = getUserToken();

  //   STEP 1: GET Budget
  useEffect(() => {
    let budgetConfig = {
      method: "get",
      url: `${config.API_URL}/budget/${budgetId}/`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(budgetConfig);
        setBudget(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  //   STEP 2: GET all budget items in a budget
  useEffect(() => {
    let budgetItemsConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${config.API_URL}/budget-items/budget/${budgetId}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(budgetItemsConfig);
        setBudgetItems({ data: response.data.data, filtered: false });
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    makeRequest();
  }, [manualRefresh]);
  const [deleteItem, setDeleteItem] = useState();

  // handle to select the item to be delete and open delete prompt
  const deleteModalItem = (item) => {
    setDeleteItem(item);
    openDeletePrompt();
  };

  const deleteBudget = async () => {
    try {
      await axios.delete(`${config.API_URL}/budget/${deleteItem?._id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      onCloseDeletePrompt();
      navigate("/budget/view");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    if (text.trim() !== "") {
      const lowerCaseSearch = text.toLowerCase();
      const searchedBudgetData = budgetItems.data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseSearch) ||
          item.description.toLowerCase().includes(lowerCaseSearch)
      );
      setBudgetItems({
        data: searchedBudgetData,
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
        count={budgetItems?.data?.length}
        title={
          !isLargerThan880
            ? `${budget?.name.substring(0, 30)} ${
                budget?.name.length > 30 ? " ..." : ""
              }`
            : budget?.name
        }
        subtitle={
          !isLargerThan880
            ? `${budget?.description.substring(0, 50)} ${
                budget?.name.length > 30 ? " ..." : ""
              }`
            : budget?.description
        }
      >
        <Flex gap={2} alignItems="center">
          {(budgetItems?.data?.length === 0 && budgetItems?.search) ||
          budgetItems?.data?.length > 0 ? (
            !isLargerThan880 ? (
              <FaSearch />
            ) : (
              <Input
                placeholder="Search Budget ..."
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                w="fit-content"
              />
            )
          ) : (
            <></>
          )}
          <Button variant="ghost" onClick={() => navigate("/budget/view")}>
            {!isLargerThan880 ? <FaEye /> : "View All Budgets"}
          </Button>
          <Button
            bg="green.300"
            color="white"
            onClick={() =>
              navigate("/budget/add/2", {
                state: { budget: { ...budgetItems, _id: budgetId } },
              })
            }
            _hover={{
              bg: "green.300",
            }}
          >
            +
          </Button>
          <Button
            bg="red.400"
            color="white"
            _hover={{
              bg: "red.400",
            }}
            onClick={() => deleteModalItem(budget)}
          >
            x
          </Button>
          {(budgetItems?.data?.length === 0 && budgetItems?.filtered) ||
            (budgetItems?.data?.length > 0 && (
              <BudgetItemsFilterData
                setBudgetItems={setBudgetItems}
                budgetItems={budgetItems}
                setManualRefresh={setManualRefresh}
              />
            ))}
        </Flex>
      </DataHeader>

      {/* budget metadata/analytics */}
      <DetailedAnalyticsNav
        data={budgetItems?.data}
        plannedExpense={budget?.plannedExpenses}
      />
      <BudgetItemsDataTable
        data={budgetItems?.data}
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setSortBy={setSortBy}
        setManualRefresh={setManualRefresh}
      />

      {/* not found */}
      <DataNotFoundWithChildren
        budget={budget}
        budgetItems={budgetItems}
        budgetId={budgetId}
        deleteBudget={deleteModalItem}
      />

      {/* delete budget modal */}
      {isOpenDeletePrompt && (
        <ConfirmDeleteModal
          isOpen={isOpenDeletePrompt}
          onClose={onCloseDeletePrompt}
          deleteHandler={deleteBudget}
        />
      )}
    </Flex>
  );
}

export default ViewUserBudgetItems;
