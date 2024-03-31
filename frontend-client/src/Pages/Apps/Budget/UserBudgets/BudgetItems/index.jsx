import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaEye, FaSearch } from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import QuickBudgetAnalyticsNav from "../../../../../components/Analytics/QuickBudgetAnalyticsNav";
import { getUserToken } from "../../../../../helpers/getToken";
import { config } from "../../../../../config";
import DataHeader from "../../../../../components/Table/DataHeader";
import BudgetItemsDataTable from "./BudgetItemsDataTable";
import DataNotFoundWithChildren from "./DataNotFoundWithChildren";

function ViewUserBudgetItems() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState();
  const [budgetItems, setBudgetItems] = useState({ filtered: false });
  const { budgetId } = useParams();
  const [manualRefresh, setManualRefresh] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  // const handleEllipsisClick = (item) => {
  //   setSelectedItem(item === selectedItem ? null : item);
  // };

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
  }, []);

  const handleFilterBudgetItems = (data) => {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];

    const filteredBudget = budgetItems.data.filter(
      (item) => item[key] === value
    );

    setBudgetItems({
      data: filteredBudget,
      filtered: true,
    });
  };

  const deleteBudget = async (data) => {
    try {
      await axios.delete(`${config.API_URL}/budget/${data?._id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      navigate("/budget/view");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // const deleteBudgetItem = async (data) => {
  //   try {
  //     await axios.delete(`${config.API_URL}/budget-items/${data?._id}`, {
  //       headers: { Authorization: `Bearer ${userToken}` },
  //     });
  //     setDataUpdated(!dataUpdated);
  //     setSelectedItem(null);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };
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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }

    budgetItems?.data?.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
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
            )
          ) : (
            <></>
          )}
          <Button
            border="1px solid"
            borderColor="gray.400"
            onClick={() => navigate("/budget/view")}
          >
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
            onClick={() => deleteBudget(budget)}
          >
            x
          </Button>
          {(budgetItems?.data?.length === 0 && budgetItems?.filtered) ||
          budgetItems?.data?.length > 0 ? (
            <Menu closeOnSelect={true}>
              <MenuButton
                as={IconButton}
                aria-label="filter"
                icon={
                  budgetItems?.filtered ? (
                    <MdClose onClick={() => setManualRefresh(true)} />
                  ) : (
                    <BsFilterRight cursor="pointer" />
                  )
                }
              />
              <MenuList>
                <MenuOptionGroup title="Status" type="radio">
                  <MenuItemOption
                    value="yes"
                    onClick={() => handleFilterBudgetItems({ isActive: true })}
                  >
                    Active
                  </MenuItemOption>
                  <MenuItemOption
                    value="no"
                    onClick={() => handleFilterBudgetItems({ isActive: false })}
                  >
                    Inactive
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title="Recurring" type="radio">
                  <MenuItemOption
                    value="yes"
                    onClick={() =>
                      handleFilterBudgetItems({ isRecurring: true })
                    }
                  >
                    Yes
                  </MenuItemOption>
                  <MenuItemOption
                    value="no"
                    onClick={() =>
                      handleFilterBudgetItems({ isRecurring: false })
                    }
                  >
                    No
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          ) : (
            <></>
          )}
        </Flex>
      </DataHeader>

      {/* budget metadata/analytics */}
      {budgetItems?.data?.length > 0 && (
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap={4}>
            <QuickBudgetAnalyticsNav
              title="Total Expenses"
              amount={budgetItems?.data?.reduce(
                (acc, item) => acc + item.plannedExpenses,
                0
              )}
            />
            <QuickBudgetAnalyticsNav
              title="Total Planned Expenses"
              amount={budget?.plannedExpenses}
            />
          </Flex>
          {isLargerThan880 && (
            <Button
              border="1px solid"
              borderColor="gray.400"
              color="gray.500"
              fontWeight={500}
              onClick={() => navigate("/budget/analytics")}
            >
              Detailed analytics
            </Button>
          )}
        </Flex>
      )}
      <BudgetItemsDataTable
        data={budgetItems?.data}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />

      {/* not found */}
      <DataNotFoundWithChildren
        budget={budget}
        budgetItems={budgetItems}
        budgetId={budgetId}
        deleteBudget={deleteBudget}
      />
    </Flex>
  );
}

export default ViewUserBudgetItems;
