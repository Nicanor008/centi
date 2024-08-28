import { VStack, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

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
            <Controller
              control={methods.control}
              name="plannedIncome"
              render={( {field} ) => (
                <FormControl id="plannedIncome">
                  <FormLabel htmlFor="plannedIncome">
                    Planned Income for this budget
                  </FormLabel>
                  <NumericFormat
                    prefix="KES "
                    placeholder="Budget Planned Income"
                    thousandSeparator
                    customInput={Input}
                    onValueChange={(v) => field.onChange(v.value)}
                  />
                </FormControl>
              )}
            />
          <FormControl id="plannedExpenses">
            <FormLabel htmlFor="plannedExpenses">Expense</FormLabel>
            <Controller
              control={methods.control}
              name="plannedExpenses"
              render={( { field } ) => (
                <NumericFormat
                  prefix="KES "
                  placeholder="Budget Planned Expenses"
                  thousandSeparator
                  customInput={Input}
                  onValueChange={(v) => field.onChange(v.value)}
                />
              )}
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
