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
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import DatePicker, {
  defaultDatePickerOptions,
} from "../../../../../../components/DatePicker";

function ViewUserBudgets() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState({ filtered: false });
  const [manualRefresh, setManualRefresh] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(
    defaultDatePickerOptions[0]
  );

  const cachedBudget = useMemo(() => {
    if (!budget) return null;

    return {
      total: budget.total,
      data: budget.data,
      filtered: false,
    };
  }, [budget]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:4005/api/v1/budget/",
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
            <Text color="gray.500" fontSize={12} fontWeight={400}>
              This is your budget history
            </Text>
          </Flex>
        </Flex>

        <Flex alignItems="center" gap={2}>
          <Button mr={3}>Search</Button>
          <Button
            bg="red.400"
            color="white"
            onClick={() => navigate("/budget/add/1")}
          >
            Create Budget
          </Button>
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
        </Flex>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text>
          Total spent from 15/02/2022 is <b>KES. 500, 000</b>
        </Text>
        <Button
          border="1px solid"
          borderColor="gray.200"
          color="gray.500"
          fontWeight={500}
        >
          View Budget analytics
        </Button>
      </Flex>
      {/* view all budgets - content */}
      <TableContainer bg="gray.200" my={4}>
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Total Money Spent</Th>
              <Th>Total No. of Expenses</Th>
              <Th>Planned Income</Th>
              <Th>Category</Th>
              <Th>Active</Th>
              <Th>Recurring</Th>
              <Th>Date Created</Th>
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
                <Td>KES {budget?.plannedExpenses}</Td>
                <Td>{budget?.budgetItemsCount}</Td>
                <Td>KES {budget?.plannedIncome}</Td>
                <Td
                  minW={budget?.category?.length > 0 ? "200px" : "auto"}
                  h={budget?.category?.length > 0 ? "80px" : "auto"}
                  display="flex"
                  flexWrap="wrap"
                  overflow="scroll"
                  alignItems="center"
                  bg="inherit"
                >
                  {budget?.category?.map((category) => (
                    <Tag
                      mr={1}
                      mb={budget?.category.length > 3 ? 1 : 0}
                      key={category._id}
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
    </Flex>
  );
}

export default ViewUserBudgets;
