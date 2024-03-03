import React from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { Flex, Text, Button, Input, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Component for Budget Form
const BudgetForm = ({ methods }) => {
  return (
    <>
      <VStack spacing={4}>
        <Input
          placeholder="Budget Name"
          bg={"gray.100"}
          border="1px solid"
          borderColor="gray.300"
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          {...methods.register("name")}
        />
        <Input
          placeholder="Budget Description"
          bg={"gray.100"}
          border="1px solid"
          borderColor="gray.300"
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          {...methods.register("description")}
        />
        <Input
          placeholder="Budget Planned Income"
          bg={"gray.100"}
          border="1px solid"
          borderColor="gray.300"
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          {...methods.register("plannedIncome")}
          type="number"
        />
        <Input
          placeholder="Budget Planned Expenses"
          bg={"gray.100"}
          border="1px solid"
          borderColor="gray.300"
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          {...methods.register("plannedExpenses")}
          type="number"
        />
      </VStack>
    </>
  );
};

// Component for Budget Item Form
const BudgetItemForm = ({ budget, methods }) => {
  // const methods = useForm();
  // const { handleSubmit } = methods;

  // const onSubmit = async (data) => {
  //   try {
  //     // Include the budgetId in the budget item data
  //     data.budgetId = budgetId;

  //     // Send budget item data to the server using axios
  //     await axios.post("/api/create-budget-item", data);

  //     // Proceed to the next step
  //     onNext();
  //   } catch (error) {
  //     console.error("Error creating budget item:", error);
  //   }
  // };

  return (
    <>
      <Input
        placeholder="Budget Item Name"
        bg={"gray.100"}
        border="1px solid"
        borderColor="gray.300"
        color={"gray.500"}
        _placeholder={{
          color: "gray.500",
        }}
        {...methods.register("itemName")}
        type="number"
      />
      <Input
        placeholder="Budget Item Planned Expense"
        bg={"gray.100"}
        border="1px solid"
        borderColor="gray.300"
        color={"gray.500"}
        _placeholder={{
          color: "gray.500",
        }}
        {...methods.register("itemPlannedExpense")}
        type="number"
      />

      {/* <label>Description:</label>
      <input {...methods.register("description")} />

      <label>Item Actual Expense:</label>
      <input type="number" {...methods.register("itemActualExpense")} />

      <label>Date:</label>
      <input type="date" {...methods.register("date")} />

      <button type="submit">Submit</button> */}
    </>
  );
};

// Stepper Component
const CreateBudget = () => {
  const navigate = useNavigate();
  const { currentStep } = useParams();
  const methods = useForm();
  const { handleSubmit, getValues, reset } = methods;
  const [activeStep, setActiveStep] = React.useState(
    Number(currentStep) - 1 ?? 0
  );
  const { state } = useLocation();
  const [budget, setBudget] = React.useState(state?.budget ?? null);

  const handleNext = async (data) => {
    const payload = {
      ...getValues(),
      plannedExpenses: Number(getValues().plannedExpenses),
      plannedIncome: Number(getValues().plannedIncome),
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4005/api/v1/budget/",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      const response = await axios.request(config);
      setBudget(response.data?.data);
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setBudget(null);
    reset();
  };

  const onSubmit = () => {
    // Perform any final actions here
    console.log("Budget and budget items submitted successfully!");
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit(handleNext)}>
            <BudgetForm methods={methods} />
          </form>
        );
      case 1:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <BudgetItemForm budget={budget} methods={methods} />
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <Flex flexDir="column">
      {/* header */}
      <Flex
        py={4}
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="gray.300"
        mb={[1, 4]}
      >
        <Flex flexDir="column">
          <Text fontWeight={600} fontSize={16}>
            Create Budget
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            Create and add items to your budget for easy tracking
          </Text>
        </Flex>

        <Flex mr={[0, 8]}>
          <Button
            bg="red.400"
            color="white"
            onClick={() => navigate("/budget/view")}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
      <FormProvider {...methods}>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {renderStepContent()}
        <div>
          {activeStep > 0 && (
            <button
              type="button"
              onClick={() => setActiveStep((prevStep) => prevStep - 1)}
            >
              Back
            </button>
          )}
          {activeStep < 1 ? (
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              onClick={() => handleNext()}
              type="submit"
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Next
            </Button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
        {/* </form> */}
      </FormProvider>
    </Flex>
  );
};

export default CreateBudget;
