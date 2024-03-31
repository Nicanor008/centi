import { Flex, Th } from "@chakra-ui/react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const ColumnHeaderCellWithSort = ({
  name,
  column,
  sortBy,
  handleSort,
  sortOrder,
}) => (
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

export default ColumnHeaderCellWithSort;
