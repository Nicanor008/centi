import { VStack, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

const CreateBudgetForm = ({
  methods,
  userCategories,
  selectedCategory,
  handleSelectedCategory,
  financialGoals,
  setSelectedFinancialGoal,
}) => {
  return (
    <>
      <VStack spacing={4} alignItems="left">
        <Flex gap={4} flexDir={["column", "row"]}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              placeholder="Budget Name"
              bg="white"
              {...methods.register("name")}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              placeholder="Budget Description"
              bg="white"
              {...methods.register("description")}
            />
          </FormControl>
        </Flex>
        <Flex gap={4} flexDir={["column", "row"]}>
          <FormControl id="plannedIncome">
            <FormLabel htmlFor="plannedIncome">
              Planned Income for this budget
            </FormLabel>
            <Input
              placeholder="Budget Planned Income"
              bg="white"
              _placeholder={{
                color: "gray.500",
              }}
              {...methods.register("plannedIncome")}
              type="number"
            />
          </FormControl>
          <FormControl id="plannedExpenses">
            <FormLabel htmlFor="plannedExpenses">Expense</FormLabel>
            <Input
              placeholder="Budget Planned Expenses"
              bg={"white"}
              _placeholder={{
                color: "gray.500",
              }}
              {...methods.register("plannedExpenses")}
              type="number"
            />
          </FormControl>
        </Flex>
        <Flex gap={4} flexDir={["column", "row"]}>
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
              // styles={customStyles}
              value={selectedCategory}
              onChange={handleSelectedCategory}
            />
          </FormControl>
        </Flex>
      </VStack>
    </>
  );
};

export default CreateBudgetForm;
