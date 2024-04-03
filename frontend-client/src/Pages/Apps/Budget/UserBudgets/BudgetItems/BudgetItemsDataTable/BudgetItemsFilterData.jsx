import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React from "react";
import { BsFilterRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const BudgetItemsFilterData = ({
  setBudgetItems,
  budgetItems,
  setManualRefresh,
}) => {
  const handleFilterBudgetItems = (data) => {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];

    const filteredBudget = budgetItems.data.filter(
      (item) => item[key] === value
    );

    setBudgetItems({
      data: filteredBudget,
      filtered: true,
    });
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={IconButton}
        aria-label="filter"
        variant="ghost"
        icon={
          budgetItems?.filtered ? (
            <MdClose onClick={() => setManualRefresh(true)} />
          ) : (
            <BsFilterRight cursor="pointer" />
          )
        }
      />
      <MenuList>
        <MenuOptionGroup title="Status" type="radio">
          <MenuItemOption
            value="yes"
            onClick={() => handleFilterBudgetItems({ isActive: true })}
          >
            Active
          </MenuItemOption>
          <MenuItemOption
            value="no"
            onClick={() => handleFilterBudgetItems({ isActive: false })}
          >
            Inactive
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Recurring" type="radio">
          <MenuItemOption
            value="yes"
            onClick={() => handleFilterBudgetItems({ isRecurring: true })}
          >
            Yes
          </MenuItemOption>
          <MenuItemOption
            value="no"
            onClick={() => handleFilterBudgetItems({ isRecurring: false })}
          >
            No
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default BudgetItemsFilterData;
