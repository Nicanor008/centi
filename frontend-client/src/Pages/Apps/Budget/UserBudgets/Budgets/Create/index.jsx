import React from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import {
  Flex,
  Text,
  Button,
  Input,
  VStack,
  useMediaQuery,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { getUserToken } from "../../../../../../helpers/getToken";
import { config } from "../../../../../../config";

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
      <VStack spacing={4} alignItems="left">
        <Flex gap={4} flexDir={["solumn", "row"]}>
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
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");

  React.useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(`${config.API_URL}/category`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

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
        const response = await axios.get(`${config.API_URL}/financial-goals`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

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

    let config2 = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${config.API_URL}/budget/`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      // submit data
      const response = await axios.request(config2);
      setBudget(response.data?.data);

      // add category
      removedUndefinedInCategory?.length > 0 &&
        (await axios.post(
          `${config.API_URL}/category/`,
          removedUndefinedInCategory,
          { headers: { Authorization: `Bearer ${userToken}` } }
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

    let config2 = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${config.API_URL}/budget-items/`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      // submit data
      await axios.request(config2);

      // add category
      await axios.post(`${config.API_URL}/category/`, newCategoriesPayload, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

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
          {/* TODO: this should be a modal/dialog */}
          {isLargerThan880 && (
            <Button
              border="1px solid"
              borderColor="gray.400"
              onClick={() => navigate("/financial-goals/add")}
              mr={2}
              color="gray.700"
              fontWeight={400}
            >
              Create Financial Goal
            </Button>
          )}
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
              mt={(2, 8)}
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
