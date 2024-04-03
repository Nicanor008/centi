import { VStack, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const CreateBudgetItemForm = ({
  methods,
  userCategories,
  selectedCategory,
  handleSelectedCategory,
  financialGoals,
  setSelectedFinancialGoal,
}) => {
  return (
    <VStack spacing={4} alignItems="left">
      <Flex gap={4} flexDir={["column", "row"]}>
        <FormControl id="name">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            placeholder="Budget Item Name"
            bg="white"
            {...methods.register("name")}
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            placeholder="Budget Item Description"
            bg="white"
            {...methods.register("description")}
          />
        </FormControl>
        <FormControl id="actualExpenses">
          <FormLabel htmlFor="actualExpenses">Expense Spent</FormLabel>
          <Input
            placeholder="Budget Spent Expense"
            bg="white"
            {...methods.register("actualExpenses")}
            type="number"
          />
        </FormControl>
      </Flex>
      <Flex gap={4} flexDir={["solumn", "row"]}>
        <FormControl>
          <FormLabel>Financial Goal</FormLabel>
          <Select
            isLoading={false}
            isClearable={true}
            isSearchable={false}
            options={financialGoals}
            onChange={(e) => setSelectedFinancialGoal(e.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <CreatableSelect
            isMulti
            isCreatable
            options={userCategories}
            value={selectedCategory}
            onChange={handleSelectedCategory}
          />
        </FormControl>
      </Flex>
    </VStack>
  );
};

export default CreateBudgetItemForm;
