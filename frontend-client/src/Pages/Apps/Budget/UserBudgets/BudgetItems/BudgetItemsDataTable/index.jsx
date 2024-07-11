import {
  Table,
  TableContainer,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import {
  ColumnHeaderCellWithSort,
  ConfirmDeleteModal,
} from "../../../../../../components";
import BudgetItemsRowMenu from "../../../../../../components/Budget/BudgetItemsRowMenu";
import CategoryCell from "../../../../../../components/Table/Cell/CategoryCell";
import { config } from "../../../../../../config";
import { formatNumberGroups } from "../../../../../../helpers/formatNumberGroups";
import { getUserToken } from "../../../../../../helpers/getToken";
import UpdateExpense from "../UpdateExpense";

const BudgetItemsDataTable = ({
  data,
  sortBy,
  sortOrder,
  setSortOrder,
  setSortBy,
  setManualRefresh,
}) => {
  const [selectedItem, setSelectedItem] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeletePrompt,
    onOpen: openDeletePrompt,
    onClose: onCloseDeletePrompt,
  } = useDisclosure();
  const userToken = getUserToken();

  const handleEllipsisClick = (item) => {
    setSelectedItem(item);
  };

  // sort any selected column
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

  // delete budget items
  const deleteBudgetItem = async () => {
    setManualRefresh(true);
    try {
      await axios.delete(`${config.API_URL}/expenses/${selectedItem?._id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setManualRefresh(false);
      setSelectedItem(null);
      onCloseDeletePrompt();
    } catch (error) {
      setManualRefresh(false);
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <TableContainer bg="gray.200" my={4}>
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <ColumnHeaderCellWithSort
                name="Name"
                column="name"
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
              />
              {/* <ColumnHeaderCellWithSort
                name="Description"
                column="description"
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
              /> */}
              {/* <ColumnHeaderCellWithSort
                name="Expenses"
                column="plannedExpenses"
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
              /> */}
              <ColumnHeaderCellWithSort
                name="Expense"
                column="actualExpenses"
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
              />
              <Th>Category</Th>
              <Th>Active</Th>
              <ColumnHeaderCellWithSort
                name="Date Created"
                column="createdAt"
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
              />
              <ColumnHeaderCellWithSort
                name="Updated On"
                column="updatedAt"
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
              />
            </Tr>
          </Thead>
          <Tbody>
            {data?.length > 0 &&
              data?.map((item, idx) => (
                <Tr cursor="pointer" key={idx}>
                  <Td>{item.name}</Td>
                  {/* <Td>{item?.description}</Td> */}
                  {/* <Td>KES {formatNumberGroups(item?.plannedExpenses)}</Td> */}
                  <Td>KES {formatNumberGroups(item?.actualExpenses)}</Td>
                  <CategoryCell categories={item?.category} />
                  <Td>{item?.isActive ? "Yes" : "No"}</Td>
                  <Td>{new Date(item?.createdAt).toDateString()}</Td>
                  <Td>{new Date(item?.updatedAt).toDateString()}</Td>
                  <BudgetItemsRowMenu
                    handleEllipsisClick={handleEllipsisClick}
                    onOpen={onOpen}
                    item={item}
                    openDeletePrompt={openDeletePrompt}
                  />
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isOpen && (
        <UpdateExpense
          isOpen={isOpen}
          onClose={onClose}
          selectedItem={selectedItem}
          setManualRefresh={setManualRefresh}
        />
      )}
      {isOpenDeletePrompt && (
        <ConfirmDeleteModal
          isOpen={isOpenDeletePrompt}
          onClose={onCloseDeletePrompt}
          deleteHandler={deleteBudgetItem}
        />
      )}
    </>
  );
};

export default BudgetItemsDataTable;
