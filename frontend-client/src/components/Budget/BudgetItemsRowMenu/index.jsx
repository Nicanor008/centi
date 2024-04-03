import {
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";

const BudgetItemsRowMenu = () => (
  <Td>
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FaEllipsisV />}
        onClick={() => handleEllipsisClick(item)}
        variant="none"
      />
      <MenuList>
        <MenuItem icon={<FaEdit />} onClick={() => setSelectedItem(null)}>
          Update
        </MenuItem>
        <MenuItem icon={<FaTrash />} onClick={() => deleteBudgetItem(item)}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  </Td>
);

export default BudgetItemsRowMenu;
