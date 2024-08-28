import React from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { Flex, Text, Button, useMediaQuery } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserToken } from "../../../../../../helpers/getToken";
import { config } from "../../../../../../config";
import CreateBudgetForm from "./CreateBudget";
import CreateBudgetItemForm from "./CreateBudgetItems";

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
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(`${config.API_URL}/category`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        const transformedData = response.data?.data?.map((item) => ({
          value: item?.name?.toLowerCase(),
          label: item?.name,
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
    setSubmitting(true);
    const payload = {
      ...getValues(),
      category: selectedCategory,
      financialGoal: selectedFinancialGoal,
      plannedExpenses: getValues()?.plannedExpenses ?? "",
      plannedIncome: getValues()?.plannedIncome ?? "",
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
      setSubmitting(false);

      // go to the next form
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  const onSubmit = async () => {
    setSubmitting(true);
    // Perform any final actions here
    const payload = {
      ...getValues(),
      category: selectedCategory,
      financialGoal: selectedFinancialGoal,
      plannedExpenses: getValues()?.plannedExpenses
        ? getValues()?.plannedExpenses.toString()
        : "",
      actualExpenses: getValues()?.actualExpenses.toString() ?? "",
      budgetId: budget?._id,
    };

    let config2 = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${config.API_URL}/expenses/`,
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
      removedUndefinedInCategory?.length > 0 &&
        (await axios.post(
          `${config.API_URL}/category/`,
          removedUndefinedInCategory,
          { headers: { Authorization: `Bearer ${userToken}` } }
        ));

      setSelectedCategory([]);
      reset();
      setSubmitting(false);
      setTimeout(function () {
        navigate(`/budget/items/${budget._id}`);
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit(handleNext)}>
            <CreateBudgetForm
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
            <CreateBudgetItemForm
              budget={budget}
              methods={methods}
              userCategories={userCategories}
              setSelectedCategory={setSelectedCategory}
              handleSelectedCategory={handleSelectedCategory}
              financialGoals={financialGoals}
              setSelectedFinancialGoal={setSelectedFinancialGoal}
            />
            <br /><br />
            Add another Expense
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
            Create {activeStep === 0 ? "Budget" : "Expense"}
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            Create and add expenses to your budget for easy tracking
          </Text>
        </Flex>

        <Flex mr={[0, 8]}>
          {/* TODO: this should be a modal/dialog */}
          {isLargerThan880 && (
            <Button onClick={() => navigate("/financial-goals/add")} mr={2}>
              Create Financial Goal
            </Button>
          )}
          <Button variant="secondary" onClick={() => navigate("/budget/view")}>
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
              variant="secondary"
              mt={8}
              onClick={() => navigate(-1)}
              mr={4}
            >
              Back
            </Button>
          )}
          {activeStep < 1 ? (
            <Button
              variant="primary"
              mt={8}
              onClick={() => handleNext()}
              type="submit"
              isLoading={submitting}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              mt={(2, 8)}
              onClick={() => onSubmit()}
              type="submit"
              isLoading={submitting}
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
