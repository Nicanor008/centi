import {
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  useMediaQuery,
  Divider,
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
import { formatNumberGroups } from "../../../../helpers/formatNumberGroups";
import { getUserToken } from "../../../../helpers/getToken";
import { config } from "../../../../config";
import DataNotFound from "../../../../components/ErrorPages/DataNotFound";
import ShowAnalyticsLink from "../../../../components/ShowAnalyticsLink";
import DataHeader from "../../../../components/Table/DataHeader";
import CategoryCell from "../../../../components/Table/Cell/CategoryCell";

function ViewAllSavings() {
  const navigate = useNavigate();
  const [data, setData] = useState({ filtered: false });
  const [manualRefresh, setManualRefresh] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  const userToken = getUserToken();

  const cachedData = useMemo(() => {
    if (!data) return null;

    return {
      total: data.total,
      data: data.data,
      filtered: false,
    };
  }, [data]);

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(`${config.API_URL}/savings/`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setData(response.data.data);
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
      const searchData = data.data.filter((item) =>
        item.savingsGoalName.toLowerCase().includes(lowerCaseSearch)
      );
      setData({
        data: searchData,
        total: searchData.length,
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

    cachedData?.data?.sort((a, b) => {
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
      <DataHeader
        count={cachedData?.total}
        title="Savings Tracker"
        subtitle="This is your Savings goals management"
      >
        <Flex alignItems="center" gap={2}>
          {cachedData?.data?.length > 0 &&
            (!isLargerThan880 ? (
              <FaSearch />
            ) : (
              <Input
                placeholder="Search Savings ..."
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                w="fit-content"
              />
            ))}
          <Button
            variant={!isLargerThan880 ? "ghost" : "primary"}
            onClick={() => navigate("/savings/add")}
            px={!isLargerThan880 ? 0 : 4}
          >
            {!isLargerThan880 ? <FaPlus /> : "Create Savings"}
          </Button>
        </Flex>
      </DataHeader>

      <ShowAnalyticsLink
        count={cachedData?.data?.length}
        title="Savings Analytics"
        link="/savings/analytics"
      />

      <Divider borderColor="gray.300" />

      {/* view all data content */}
      <TableContainer bg="gray.200" my={4}>
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <ColumnHeaderCell name="Name" column="name" />
              <ColumnHeaderCell column="targetAmount" name="Target" />
              <ColumnHeaderCell name="Current Savings" column="currentAmount" />
              <ColumnHeaderCell column="maturityDate" name="Maturity Date" />
              <Th>Category</Th>
              <ColumnHeaderCell column="createdAt" name="Date Created" />
            </Tr>
          </Thead>
          <Tbody>
            {cachedData?.data?.map((item, idx) => (
              <Tr cursor="pointer" key={idx}>
                <Td>{item.savingsGoalName}</Td>
                <Td>KES {formatNumberGroups(item?.targetAmount)}</Td>
                <Td>KES {formatNumberGroups(item?.currentAmount)}</Td>
                <Td>{new Date(item?.maturityDate).toLocaleDateString()}</Td>
                <CategoryCell categories={item?.category} />
                <Td>{new Date(item?.createdAt).toDateString()}</Td>
                <Td>
                  <FaEllipsisV />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {cachedData?.data?.length < 1 ? <DataNotFound /> : <></>}
    </Flex>
  );
}

export default ViewAllSavings;
