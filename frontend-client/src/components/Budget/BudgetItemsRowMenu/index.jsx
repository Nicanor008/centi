import {
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import UpdateExpense from "../../../Pages/Apps/Budget/UserBudgets/BudgetItems/UpdateExpense";

const BudgetItemsRowMenu = ({ selectedItem, handleEllipsisClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <MenuItem icon={<FaTrash />} onClick={() => deleteBudgetItem(item)}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
      {isOpen && (
        <UpdateExpense onClose={onClose} selectedItem={selectedItem} />
      )}
    </>
  );
};

export default BudgetItemsRowMenu;
