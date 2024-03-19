import React from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { Flex, Text, Button, Input, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { getUserToken } from "../../../../../../helpers/getToken";

// Component for Budget Form
const BudgetForm = ({
  methods,
  userCategories,
  selectedCategory,
  handleSelectedCategory,
  financialGoals,
  setSelectedFinancialGoal,
}) => {
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
        <Flex gap={4} flexDir={["solumn", "row"]}>
          <Select
            isLoading={false}
            isClearable={true}
            isSearchable={false}
            options={financialGoals}
            onChange={(e) => setSelectedFinancialGoal(e.value)}
          />
          <CreatableSelect
            isMulti
            isCreatable
            options={userCategories}
            // styles={customStyles}
            value={selectedCategory}
            onChange={handleSelectedCategory}
          />
        </Flex>
      </VStack>
    </>
  );
};

// Component for Budget Item Form
const BudgetItemForm = ({
  methods,
  userCategories,
  selectedCategory,
  handleSelectedCategory,
  financialGoals,
  setSelectedFinancialGoal,
}) => {
  return (
    <>
      <VStack spacing={4}>
        <Input
          placeholder="Budget Item Name"
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
          placeholder="Budget Item Description"
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
          placeholder="Budget Spent Expense"
          bg={"gray.100"}
          border="1px solid"
          borderColor="gray.300"
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          {...methods.register("actualExpenses")}
          type="number"
        />
        <Select
          isLoading={false}
          isClearable={true}
          isSearchable={false}
          options={financialGoals}
          onChange={(e) => setSelectedFinancialGoal(e.value)}
        />
        <CreatableSelect
          isMulti
          isCreatable
          options={userCategories}
          // styles={customStyles}
          value={selectedCategory}
          onChange={handleSelectedCategory}
        />
      </VStack>
    </>
  );
};

// Stepper Component
const CreateBudget = () => {
  const navigate = useNavigate();
  const { currentStep } = useParams();
  const methods = useForm();
  const { handleSubmit, getValues, reset } = methods;
  const [activeStep, setActiveStep] = React.useState(Number(currentStep) - 1);
  const { state } = useLocation();
  const [budget, setBudget] = React.useState(state?.budget ?? null);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [financialGoals, setFinancialGoals] = React.useState([]);
  const [selectedFinancialGoal, setSelectedFinancialGoal] = React.useState([]);

  const [userCategories, setUserCategories] = React.useState([]);
  const userToken = getUserToken();

  React.useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/v1/category",
          { headers: { Authorization: `Bearer ${userToken}` } }
        );

        const transformedData = response.data?.data?.map((item) => ({
          value: item.name.toLowerCase(),
          label: item.name,
          ...item,
        }));
        setUserCategories(transformedData);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  // get all financial goals for this user
  React.useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/v1/financial-goals",
          { headers: { Authorization: `Bearer ${userToken}` } }
        );

        const updatedResponseData = response.data?.data?.data?.map((item) => {
          return { ...item, label: item.name, value: item._id };
        });

        setFinancialGoals(updatedResponseData);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  const handleSelectedCategory = async (selected) => {
    setSelectedCategory(selected);
  };

  const newCategoriesPayload = selectedCategory?.map((item) => {
    if (item?.__isNew__) {
      return { name: item?.label };
    }
    return;
  });

  const removedUndefinedInCategory = newCategoriesPayload.filter(
    (item) => item !== undefined
  );

  const handleNext = async () => {
    const payload = {
      ...getValues(),
      category: selectedCategory,
      financialGoal: selectedFinancialGoal,
      plannedExpenses: Number(getValues()?.plannedExpenses) ?? 0,
      plannedIncome: Number(getValues()?.plannedIncome) ?? 0,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4005/api/v1/budget/",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      // submit data
      const response = await axios.request(config);
      setBudget(response.data?.data);

      // add category
      removedUndefinedInCategory?.length > 0 &&
        (await axios.post(
          "http://localhost:4005/api/v1/category/",
          { headers: { Authorization: `Bearer ${userToken}` } },
          removedUndefinedInCategory
        ));

      // clean up
      setSelectedCategory([]);
      setFinancialGoals([]);
      reset();

      // go to the next form
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    // Perform any final actions here
    const payload = {
      ...getValues(),
      category: selectedCategory,
      financialGoal: selectedFinancialGoal,
      actualExpenses: getValues()?.plannedExpenses
        ? Number(getValues()?.plannedExpenses)
        : 0,
      plannedExpenses: Number(getValues()?.actualExpenses) ?? 0,
      budgetId: budget?._id,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4005/api/v1/budget-items/",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      // submit data
      await axios.request(config);

      // add category
      await axios.post(
        "http://localhost:4005/api/v1/category/",
        { headers: { Authorization: `Bearer ${userToken}` } },
        newCategoriesPayload
      );

      setSelectedCategory([]);
      reset();
      setTimeout(function () {
        navigate(`/budget/items/${budget._id}`);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit(handleNext)}>
            <BudgetForm
              methods={methods}
              userCategories={userCategories}
              setSelectedCategory={setSelectedCategory}
              handleSelectedCategory={handleSelectedCategory}
              financialGoals={financialGoals}
              setSelectedFinancialGoal={setSelectedFinancialGoal}
            />
          </form>
        );
      case 1:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <BudgetItemForm
              budget={budget}
              methods={methods}
              userCategories={userCategories}
              setSelectedCategory={setSelectedCategory}
              handleSelectedCategory={handleSelectedCategory}
              financialGoals={financialGoals}
              setSelectedFinancialGoal={setSelectedFinancialGoal}
            />
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

      {/* body */}
      <FormProvider {...methods}>
        {renderStepContent()}
        <div>
          {activeStep > 0 && (
            <Button
              fontFamily={"heading"}
              mt={8}
              bg="gray.400"
              color={"white"}
              onClick={() => navigate(-1)}
              _hover={{
                bg: "gray.400",
                boxShadow: "xl",
              }}
              mr={4}
            >
              Back
            </Button>
          )}
          {activeStep < 1 ? (
            <Button
              fontFamily={"heading"}
              mt={8}
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
            <Button
              fontFamily={"heading"}
              mt={8}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              onClick={() => onSubmit()}
              type="submit"
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Submit
            </Button>
          )}
        </div>
      </FormProvider>
    </Flex>
  );
};

export default CreateBudget;
