import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ColumnHeaderCellWithSort } from "../../../../../../../components";
import CategoryCell from "../../../../../../../components/Table/Cell/CategoryCell";
import { formatNumberGroups } from "../../../../../../../helpers/formatNumberGroups";

const BudgetDataTable = ({ data }) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }

    data?.sort((a, b) => {
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
              handleSort={handleSort}
              sortOrder={sortOrder}
            />
            <ColumnHeaderCellWithSort
              column="description"
              name="Description"
              sortBy={sortBy}
              handleSort={handleSort}
              sortOrder={sortOrder}
            />
            <ColumnHeaderCellWithSort
              name="Money Planned"
              column="plannedExpenses"
              sortBy={sortBy}
              handleSort={handleSort}
              sortOrder={sortOrder}
            />
            {/* <ColumnHeaderCellWithSort
              name="Money Spent"
              column="totalExpenses"
              sortBy={sortBy}
              handleSort={handleSort}
              sortOrder={sortOrder}
            /> */}
            {/* <Th>Money Spent</Th> */}
            <ColumnHeaderCellWithSort
              column="budgetItemsCount"
              name="No. of Expenses"
              sortBy={sortBy}
              handleSort={handleSort}
              sortOrder={sortOrder}
            />
            <ColumnHeaderCellWithSort
              column="plannedIncome"
              name="Planned Income"
              sortBy={sortBy}
              handleSort={handleSort}
              sortOrder={sortOrder}
            />
            <Th>Category</Th>
            <Th>Active</Th>
            {/* <Th>Recurring</Th> */}
            <ColumnHeaderCellWithSort
              column="createdAt"
              name="Date Created"
              sortBy={sortBy}
              handleSort={handleSort}
              sortOrder={sortOrder}
            />
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((budget, idx) => (
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
              {/* <Td>{formatNumberGroups(budget?.totalExpenses)}</Td> */}
              <Td>{formatNumberGroups(budget?.budgetItemsCount)}</Td>
              <Td>KES {formatNumberGroups(budget?.plannedIncome)}</Td>
              <CategoryCell categories={budget?.category} />
              <Td>{budget?.isActive ? "Yes" : "No"}</Td>
              {/* <Td>{budget?.isRecurring ? "Yes" : "No"}</Td> */}
              <Td>{new Date(budget?.createdAt).toLocaleDateString()}</Td>
              <Td>
                <FaEllipsisV />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BudgetDataTable;
