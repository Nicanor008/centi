import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import DatePicker, {
  defaultDatePickerOptions,
} from "../../../../../../../components/DatePicker";

const BudgetFilterMenu = ({
  setManualRefresh,
  isFilter,
  setBudget,
  budgetData,
}) => {
  const [datePickerValue, setDatePickerValue] = useState(
    defaultDatePickerOptions[0]
  );
  const handleFilterBudget = (data) => {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];

    const filteredBudget = budgetData.filter((item) => item[key] === value);

    setBudget({
      data: filteredBudget,
      total: filteredBudget.length,
      filtered: true,
    });
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={IconButton}
        aria-label="filter"
        icon={
          isFilter ? (
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
            onClick={() => handleFilterBudget({ isActive: true })}
          >
            Active
          </MenuItemOption>
          <MenuItemOption
            value="no"
            onClick={() => handleFilterBudget({ isActive: false })}
          >
            Inactive
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Recurring" type="radio">
          <MenuItemOption
            value="yes"
            onClick={() => handleFilterBudget({ isRecurring: true })}
          >
            Yes
          </MenuItemOption>
          <MenuItemOption
            value="no"
            onClick={() => handleFilterBudget({ isRecurring: false })}
          >
            No
          </MenuItemOption>
        </MenuOptionGroup>
        <DatePicker
          value={datePickerValue}
          onChange={(newValue) => setDatePickerValue(newValue)}
        />
      </MenuList>
    </Menu>
  );
};

export default BudgetFilterMenu;
