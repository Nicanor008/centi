import {
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";

const BudgetItemsRowMenu = ({
  item,
  onOpen,
  handleEllipsisClick,
  openDeletePrompt,
}) => {
  return (
    <>
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
            <MenuItem icon={<FaEdit />} onClick={() => onOpen()}>
              Update
            </MenuItem>
            <MenuItem icon={<FaTrash />} onClick={() => openDeletePrompt()}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </>
  );
};

export default BudgetItemsRowMenu;
