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
import { config } from "../../../../config";
import CategoryCell from "../../../../components/Table/Cell/CategoryCell";
import { DataLoader } from "../../../../components";

function ViewUserFinancialGoals() {
  const navigate = useNavigate();
  const [financialGoals, setFinancialGoals] = useState({
    filtered: false,
    loading: true,
  });
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
    let payload = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${config.API_URL}/financial-goals/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(payload);
        setFinancialGoals({ ...response?.data?.data, loading: false });
      } catch (error) {
        setFinancialGoals({ loading: false });
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
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                w="fit-content"
              />
            ))}
          <Button
            variant={!isLargerThan880 ? "ghost" : "primary"}
            onClick={() => navigate("/financial-goals/add")}
            px={!isLargerThan880 ? 0 : 4}
          >
            {!isLargerThan880 ? <FaPlus /> : "Create a Financial Goal"}
          </Button>
        </Flex>
      </Flex>

      {financialGoals?.loading ? (
        <DataLoader />
      ) : (
        <>
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
                    onClick={() => navigate(`/financial-goals/${goal._id}`)}
                  >
                    <Td>{goal.name}</Td>
                    <Td>KES {formatNumberGroups(goal.targetAmount)}</Td>
                    <Td>{goal.description}</Td>
                    <Td>{new Date(goal.from).toDateString()}</Td>
                    <Td>{new Date(goal.to).toDateString()}</Td>
                    <Td>{new Date(goal.createdAt).toDateString()}</Td>
                    <CategoryCell categories={goal?.category} />
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
        </>
      )}
    </Flex>
  );
}

export default ViewUserFinancialGoals;
