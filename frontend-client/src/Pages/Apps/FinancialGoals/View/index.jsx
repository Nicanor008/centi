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
  Input,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaPlus,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { formatNumberGroups } from "../../../../helpers/formatNumberGroups";
import DataNotFound from "../../../../components/ErrorPages/DataNotFound";
import { getUserToken } from "../../../../helpers/getToken";

function ViewUserFinancialGoals() {
  const navigate = useNavigate();
  const [financialGoals, setFinancialGoals] = useState({ filtered: false });
  const [manualRefresh, setManualRefresh] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");
  const userToken = getUserToken();

  const cachedGoals = useMemo(() => {
    if (!financialGoals) return null;

    return {
      total: financialGoals.total,
      data: financialGoals.data,
      filtered: false,
    };
  }, [financialGoals]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://centi-6k7v.onrender.com/api/v1/financial-goals/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        setFinancialGoals(response?.data?.data);
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
      const searchedBudgetData = financialGoals.data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseSearch) ||
          item.description.toLowerCase().includes(lowerCaseSearch)
      );
      setFinancialGoals({
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
    cachedGoals?.data?.sort((a, b) => {
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
          {cachedGoals?.total > 0 ? (
            <Text
              bg="gray.300"
              p="2px 8px"
              borderRadius="full"
              fontWeight="bold"
            >
              {cachedGoals?.total}
            </Text>
          ) : (
            <Box />
          )}
          <Flex flexDir="column">
            <Text fontWeight={600} fontSize={16}>
              Financial goals
            </Text>
            {isLargerThan880 && (
              <Text color="gray.500" fontSize={12} fontWeight={400}>
                Live a happinness guaranteed life with the right goals
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex alignItems="center" gap={2}>
          {cachedGoals?.total > 0 &&
            (!isLargerThan880 ? (
              <FaSearch />
            ) : (
              <Input
                placeholder="Search financial goal ..."
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
            onClick={() => navigate("/financial-goals/add")}
            px={!isLargerThan880 ? 0 : 4}
          >
            {!isLargerThan880 ? <FaPlus /> : "Create a Financial Goal"}
          </Button>
        </Flex>
      </Flex>
      {console.log("...........Here we go........", financialGoals)}

      <TableContainer bg="gray.200" my={4}>
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <ColumnHeaderCell name="Financial goal" column="name" />
              <ColumnHeaderCell name="Target" column="targetAmount" />
              <ColumnHeaderCell column="description" name="Description" />
              <ColumnHeaderCell column="from" name="From" />
              <ColumnHeaderCell column="to" name="To" />
              <ColumnHeaderCell column="createdAt" name="Date Created" />
              <Th>Category</Th>
            </Tr>
          </Thead>
          <Tbody>
            {financialGoals?.data?.map((goal, idx) => (
              <Tr
                cursor="pointer"
                key={goal._id + idx}
                // onClick={() =>
                //   navigate(`/budget/items/${goal_id}`, { state: { goal} })
                // }
              >
                <Td>{goal.name}</Td>
                <Td>KES {formatNumberGroups(goal.targetAmount)}</Td>
                <Td>{goal.description}</Td>
                <Td>{new Date(goal.from).toDateString()}</Td>
                <Td>{new Date(goal.to).toDateString()}</Td>
                <Td>{new Date(goal.createdAt).toDateString()}</Td>
                <Td
                  minW={goal.category?.length > 0 ? "200px" : "auto"}
                  h={goal.category?.length > 0 ? "80px" : "auto"}
                  display="flex"
                  flexWrap="wrap"
                  overflow="scroll"
                  alignItems="center"
                  bg="inherit"
                >
                  {goal?.category?.map((category, idx) => (
                    <Tag
                      mr={1}
                      mb={goal?.category.length > 2 ? 1 : 0}
                      key={(category?._id || category?.value) + idx}
                    >
                      {category?.__isNew__ ? category?.label : category.name}
                    </Tag>
                  ))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {financialGoals?.data?.length < 1 ? (
        <Flex flexDir="column">
          <DataNotFound>
            <Link href="#" color="blue.500">
              Understand why you need a financial goal
            </Link>
          </DataNotFound>
        </Flex>
      ) : (
        <></>
      )}
    </Flex>
  );
}

export default ViewUserFinancialGoals;
