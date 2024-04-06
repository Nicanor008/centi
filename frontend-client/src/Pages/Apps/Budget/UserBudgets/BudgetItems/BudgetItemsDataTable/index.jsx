import {
  Table,
  TableContainer,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useState } from "react";
import { ColumnHeaderCellWithSort } from "../../../../../../components";
import BudgetItemsRowMenu from "../../../../../../components/Budget/BudgetItemsRowMenu";
import CategoryCell from "../../../../../../components/Table/Cell/CategoryCell";
import { formatNumberGroups } from "../../../../../../helpers/formatNumberGroups";

const BudgetItemsDataTable = ({
  data,
  sortBy,
  sortOrder,
  setSortOrder,
  setSortBy,
}) => {
  const [selectedItem, setSelectedItem] = useState();
  const handleEllipsisClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
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
            <ColumnHeaderCellWithSort
              name="Description"
              column="description"
              sortBy={sortBy}
              sortOrder={sortOrder}
              handleSort={handleSort}
            />
            <ColumnHeaderCellWithSort
              name="Expenses"
              column="plannedExpenses"
              sortBy={sortBy}
              sortOrder={sortOrder}
              handleSort={handleSort}
            />
            <ColumnHeaderCellWithSort
              name="Income"
              column="actualExpenses"
              sortBy={sortBy}
              sortOrder={sortOrder}
              handleSort={handleSort}
            />
            <Th>Category</Th>
            <Th>Active</Th>
            <Th>Recurring</Th>
            <ColumnHeaderCellWithSort
              name="Date Created"
              column="createdAt"
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
                <Td>{item?.description}</Td>
                <Td>KES {formatNumberGroups(item?.plannedExpenses)}</Td>
                <Td>KES {formatNumberGroups(item?.actualExpenses)}</Td>
                <CategoryCell categories={item?.category} />
                <Td>{item?.isActive ? "Yes" : "No"}</Td>
                <Td>{item?.isRecurring ? "Yes" : "No"}</Td>
                <Td>{new Date(item?.createdAt).toDateString()}</Td>
                <BudgetItemsRowMenu
                  handleEllipsisClick={handleEllipsisClick}
                  selectedItem={selectedItem}
                />
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BudgetItemsDataTable;
