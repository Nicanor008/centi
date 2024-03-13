import {
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Box,
  Tr,
  Th,
  Td,
  TableContainer,
  Tbody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tag,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaEdit,
  FaEllipsisV,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTrash,
} from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import DataNotFound from "../../../../../components/ErrorPages/DataNotFound";

function ViewUserBudgetItems() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState();
  const [budgetItems, setBudgetItems] = useState({ filtered: false });
  const { budgetId } = useParams();
  const [dataUpdated, setDataUpdated] = useState(false);
  const [manualRefresh, setManualRefresh] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleEllipsisClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  //   STEP 1: GET Budget
  useEffect(() => {
    let config = {
      method: "get",
      url: `http://localhost:4005/api/v1/budget/${budgetId}/`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setBudget(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, [dataUpdated]);

  //   STEP 2: GET all budget items in a budget
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:4005/api/v1/budget-items/budget/${budgetId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setBudgetItems({ data: response.data.data, filtered: false });
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    makeRequest();
  }, [dataUpdated]);

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
      await axios.delete(`http://localhost:4005/api/v1/budget/${data?._id}`);
      navigate("/budget/view");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteBudgetItem = async (data) => {
    try {
      await axios.delete(
        "http://localhost:4005/api/v1/budget-items/${data?._id}"
      );
      setDataUpdated(!dataUpdated);
      setSelectedItem(null);
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

  const ColumnHeaderCell = ({ name, column }) => (
    <>
      <Th onClick={() => handleSort(column)} cursor="pointer">
        <Flex alignItems="center">
          {name} &nbsp;
          {sortBy === column && sortOrder === "asc" ? (
            <FaSortAmountUp />
          ) : (
            <FaSortAmountDown />
          )}
        </Flex>
      </Th>
    </>
  );

  return (
    <Flex flexDir="column">
      {/* header */}
      <Flex
        py={4}
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="gray.300"
        mb={[1, 4]}
      >
        <Flex alignItems="center" gap={2}>
          {budgetItems?.data?.length ? (
            <Text
              bg="gray.300"
              p="2px 8px"
              borderRadius="full"
              fontWeight="bold"
            >
              {budgetItems?.data?.length}
            </Text>
          ) : (
            <Box />
          )}
          <Flex flexDir="column">
            <Text fontWeight={600} fontSize={16}>
              {budget?.name}
            </Text>
            <Text color="gray.500" fontSize={12} fontWeight={400}>
              {budget?.description}
            </Text>
          </Flex>
        </Flex>

        {/* menu */}
        <Flex gap={2} alignItems="center">
          {(budgetItems?.data?.length === 0 && budgetItems?.search) ||
          budgetItems?.data?.length > 0 ? (
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
          ) : (
            <></>
          )}
          <Button
            border="1px solid"
            borderColor="gray.400"
            onClick={() => navigate("/budget/view")}
          >
            View All Budgets
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
      </Flex>
      {/* budget metadata/analytics */}
      <Flex my={3} justifyContent="space-between">
        <Text>
          Total Expenses - KES. <b>sum budget items expenses</b>
        </Text>
        <Text>
          Total Planned Expenses - KES. <b>{budget?.plannedExpenses}</b>
        </Text>
        <Text>
          Planned Income - KES. <b>{budget?.plannedIncome}</b>
        </Text>
        <Text>
          Budget Started on -{" "}
          <b>{new Date(budget?.createdAt).toDateString()}</b>
        </Text>
      </Flex>
      <TableContainer bg="gray.200" my={4}>
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <ColumnHeaderCell name="Name" column="name" />
              <ColumnHeaderCell name="Description" column="description" />
              <ColumnHeaderCell name="Expenses" column="plannedExpenses" />
              <ColumnHeaderCell name="Planned Income" column="actualExpenses" />
              <Th>Category</Th>
              <Th>Active</Th>
              <Th>Recurring</Th>
              <ColumnHeaderCell name="Date Created" column="createdAt" />
            </Tr>
          </Thead>
          <Tbody>
            {budgetItems?.data?.length > 0 &&
              budgetItems?.data?.map((item, idx) => (
                <Tr
                  cursor="pointer"
                  key={idx}
                  // onClick={() => navigate("/item/add/2", { state: { item } })}
                >
                  <Td>{item.name}</Td>
                  <Td>{item?.description}</Td>
                  <Td>KES {item?.plannedExpenses}</Td>
                  <Td>KES {item?.actualExpenses}</Td>
                  <Td
                    minW={item?.category?.length > 0 ? "200px" : "auto"}
                    h={item?.category?.length > 0 ? "80px" : "auto"}
                    display="flex"
                    flexWrap="wrap"
                    overflow="scroll"
                    alignItems="center"
                    bg="inherit"
                  >
                    {item?.category?.map((category) => (
                      <Tag
                        mr={1}
                        mb={item?.category.length > 3 ? 1 : 0}
                        key={category._id}
                      >
                        {category?.__isNew__ ? category?.label : category.name}
                      </Tag>
                    ))}
                  </Td>
                  <Td>{item?.isActive ? "Yes" : "No"}</Td>
                  <Td>{item?.isRecurring ? "Yes" : "No"}</Td>
                  <Td>{new Date(item?.createdAt).toDateString()}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FaEllipsisV />}
                        onClick={() => handleEllipsisClick(item)}
                      />
                      <MenuList>
                        <MenuItem
                          icon={<FaEdit />}
                          onClick={() => setSelectedItem(null)}
                        >
                          Update
                        </MenuItem>
                        <MenuItem
                          icon={<FaTrash />}
                          onClick={() => deleteBudgetItem(item)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {(budgetItems?.data?.length < 1 &&
        (budgetItems?.filtered || budgetItems?.search)) ||
      budgetItems?.data?.length < 1 ? (
        <Flex
          alignItems="center"
          justifyContent="center"
          h="65vh"
          flexDir="column"
          gap={4}
        >
          <DataNotFound />
          <Flex gap={3}>
            <Button
              bg="red.400"
              color="white"
              onClick={() => deleteBudget(budget)}
              _hover={{
                bg: "red.400",
              }}
            >
              Delete Budget
            </Button>

            <Button
              bg="green.400"
              color="white"
              onClick={() =>
                navigate("/budget/add/2", {
                  state: { budget: { ...budgetItems, _id: budgetId } },
                })
              }
              _hover={{
                bg: "green.400",
              }}
            >
              Add Expense
            </Button>
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
}

export default ViewUserBudgetItems;
