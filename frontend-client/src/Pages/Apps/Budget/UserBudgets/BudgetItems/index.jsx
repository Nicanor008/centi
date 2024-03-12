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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import { BsFilterRight } from "react-icons/bs";

function ViewUserBudgetItems() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState();
  const [budgetItems, setBudgetItems] = useState();
  const { budgetId } = useParams();
  const [dataUpdated, setDataUpdated] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

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
        setBudgetItems(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    makeRequest();
  }, [dataUpdated]);

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

        <Flex gap={2} alignItems="center">
          <Button mr={3}>Search</Button>
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
          <Button
            border="1px solid"
            borderColor="gray.400"
            p={0}
            _hover={{ borderColor: "gray.400" }}
          >
            <BsFilterRight cursor="pointer" />
          </Button>
        </Flex>
      </Flex>
      <Flex my={3} justifyContent="space-between">
        <Text>
          Total Expenses - KES. <b>{budget?.plannedExpenses}</b>
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
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Expenses</Th>
              <Th>Planned Income</Th>
              <Th>Category</Th>
              <Th>Active</Th>
              <Th>Recurring</Th>
              <Th>Date Created</Th>
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
      {budgetItems?.data?.length < 1 && (
        <Flex
          alignItems="center"
          justifyContent="center"
          h="65vh"
          flexDir="column"
          gap={4}
        >
          <Text>You haven't created an expense yet</Text>
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
      )}
    </Flex>
  );
}

export default ViewUserBudgetItems;
