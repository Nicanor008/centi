import {
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Tag,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Input,
  useMediaQuery,
  Divider,
  Link,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEllipsisV,
  FaPlus,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import DatePicker, {
  defaultDatePickerOptions,
} from "../../../../../../components/DatePicker";
import DataNotFound from "../../../../../../components/ErrorPages/DataNotFound";
import { formatNumberGroups } from "../../../../../../helpers/formatNumberGroups";
import { getUserToken } from "../../../../../../helpers/getToken";
import { config } from "../../../../../../config";

function ViewUserBudgets() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState({ filtered: false });
  const [manualRefresh, setManualRefresh] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(
    defaultDatePickerOptions[0]
  );
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
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

  const handleFilterBudget = (data) => {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];

    const filteredBudget = budget.data.filter((item) => item[key] === value);

    setBudget({
      data: filteredBudget,
      total: filteredBudget.length,
      filtered: true,
    });
  };

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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }

    cachedBudget?.data?.sort((a, b) => {
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
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          {cachedBudget?.data?.length ? (
            <Text
              bg="gray.300"
              p="2px 8px"
              borderRadius="full"
              fontWeight="bold"
            >
              {cachedBudget?.data?.length}
            </Text>
          ) : (
            <Box />
          )}
          <Flex flexDir="column">
            <Text fontWeight={600} fontSize={16}>
              Budget Tracker
            </Text>
            {isLargerThan880 && (
              <Text color="gray.500" fontSize={12} fontWeight={400}>
                This is your budget history
              </Text>
            )}
          </Flex>
        </Flex>

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
            bg={!isLargerThan880 ? "none" : "red.400"}
            color={!isLargerThan880 ? "inherit" : "white"}
            onClick={() => navigate("/budget/add/1")}
            px={!isLargerThan880 ? 0 : 4}
          >
            {!isLargerThan880 ? <FaPlus /> : "Create Budget"}
          </Button>
          {cachedBudget?.data?.length > 0 && (
            <Menu closeOnSelect={true}>
              <MenuButton
                as={IconButton}
                aria-label="filter"
                icon={
                  budget?.filtered ? (
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
                    onClick={() => handleFilterBudget({ isActive: true })}
                  >
                    Active
                  </MenuItemOption>
                  <MenuItemOption
                    value="no"
                    onClick={() => handleFilterBudget({ isActive: false })}
                  >
                    Inactive
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup title="Recurring" type="radio">
                  <MenuItemOption
                    value="yes"
                    onClick={() => handleFilterBudget({ isRecurring: true })}
                  >
                    Yes
                  </MenuItemOption>
                  <MenuItemOption
                    value="no"
                    onClick={() => handleFilterBudget({ isRecurring: false })}
                  >
                    No
                  </MenuItemOption>
                </MenuOptionGroup>
                <DatePicker
                  value={datePickerValue}
                  onChange={(newValue) => setDatePickerValue(newValue)}
                />
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>

      <Flex py={2}>
        <Link href="/budget/analytics" fontSize={14} color="blue">
          Budget Analytics
        </Link>
      </Flex>

      <Divider borderColor="gray.300" />

      {cachedBudget?.data?.length > 0 && (
        <Flex alignItems="center" justifyContent="space-between">
          <Text>
            Total spent from{" "}
            <b>
              {cachedBudget?.data?.length > 0 &&
                new Date(
                  cachedBudget?.data[cachedBudget?.data?.length - 1]?.createdAt
                ).toDateString()}
            </b>{" "}
            is{" "}
            <b>
              KES.{" "}
              {formatNumberGroups(
                cachedBudget?.data?.reduce(
                  (acc, item) => acc + item.plannedExpenses,
                  0
                )
              )}
            </b>
          </Text>
          {isLargerThan880 && (
            <Button
              border="1px solid"
              borderColor="gray.400"
              color="gray.500"
              fontWeight={500}
              onClick={() => navigate("/budget/analytics")}
            >
              View Budget analytics
            </Button>
          )}
        </Flex>
      )}
      {/* view all budgets - content */}
      <TableContainer bg="gray.200" my={4}>
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <ColumnHeaderCell name="Name" column="name" />
              <ColumnHeaderCell column="description" name="Description" />
              <ColumnHeaderCell name="Money Planned" column="plannedExpenses" />
              <ColumnHeaderCell
                name="Money Spent"
                column="totalSpentExpenses"
              />
              <ColumnHeaderCell
                column="budgetItemsCount"
                name="Total No. of Expenses"
              />
              <ColumnHeaderCell column="plannedIncome" name="Planned Income" />
              <Th>Category</Th>
              <Th>Active</Th>
              <Th>Recurring</Th>
              <ColumnHeaderCell column="createdAt" name="Date Created" />
            </Tr>
          </Thead>
          <Tbody>
            {cachedBudget?.data?.map((budget, idx) => (
              <Tr
                cursor="pointer"
                key={idx}
                onClick={() =>
                  navigate(`/budget/items/${budget._id}`, { state: { budget } })
                }
              >
                <Td>{budget.name}</Td>
                <Td>{budget?.description}</Td>
                <Td>KES {formatNumberGroups(budget?.plannedExpenses)}</Td>
                <Td>Calculate spent expenses from budget items</Td>
                <Td>{formatNumberGroups(budget?.budgetItemsCount)}</Td>
                <Td>KES {formatNumberGroups(budget?.plannedIncome)}</Td>
                <Td
                  minW={budget?.category?.length > 0 ? "200px" : "auto"}
                  h={budget?.category?.length > 0 ? "80px" : "auto"}
                  display="flex"
                  flexWrap="wrap"
                  overflow="scroll"
                  alignItems="center"
                  bg="inherit"
                >
                  {budget?.category?.map((category, idx) => (
                    <Tag
                      mr={1}
                      mb={budget?.category.length > 3 ? 1 : 0}
                      key={(category?._id || category?.value) + idx}
                    >
                      {category?.__isNew__ ? category?.label : category.name}
                    </Tag>
                  ))}
                </Td>
                <Td>{budget?.isActive ? "Yes" : "No"}</Td>
                <Td>{budget?.isRecurring ? "Yes" : "No"}</Td>
                <Td>{new Date(budget?.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <FaEllipsisV />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {cachedBudget?.data?.length < 1 ? <DataNotFound /> : <></>}
    </Flex>
  );
}

export default ViewUserBudgets;
