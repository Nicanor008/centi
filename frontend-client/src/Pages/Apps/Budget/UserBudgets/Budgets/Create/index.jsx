import React from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import {
  Flex,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  CloseButton,
  Box,
} from "@chakra-ui/react";
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
const BudgetItemForm = ({ methods }) => {
  const [category, setCategory] = React.useState("");
  const [filteredCategories, setFilteredCategories] = React.useState([]);
  const [userCategories, setUserCategories] = React.useState([]);

  React.useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/v1/category"
        );
        setUserCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  }, []);

  const handlecategoryChange = (e) => {
    setCategory(e.target.value);

    // Filter userCategories based on input
    const filtered = userCategories.filter((cat) =>
      cat?.name?.toLowerCase().includes(category?.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  console.log(category, "...............CATEGORY........", filteredCategories);

  const handlecategoryEnter = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Add the entered tag to the category list
      const currentCategory = methods.getValues("category") || [];
      const newCategory = [...currentCategory, category.trim()];
      methods.setValue("category", newCategory);

      const payload = {
        name: category,
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:4005/api/v1/category",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      };

      try {
        await axios.request(config);
      } catch (error) {
        console.log(error);
      }

      // Clear the tag input field
      setCategory("");
      setFilteredCategories([]);
    }
  };
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
        <HStack spacing={4}>
          {methods.getValues("category")?.map((tag, index) => (
            <Tag size="lg" key={tag} variant="subtle" colorScheme="cyan">
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </HStack>
        <Input
          placeholder="Enter category and press Enter"
          value={category}
          onChange={handlecategoryChange}
          onKeyDown={handlecategoryEnter}
          bg={"gray.100"}
          border="1px solid"
          borderColor="gray.300"
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
        />
        {filteredCategories?.length > 0 && (
          <Flex
            flexDir="column"
            gap={2}
            w="100%"
            bg="red.100"
            p={4}
            my={-4}
            zIndex={1}
            border="2px solid"
            borderColor="blue.500"
            borderRadius={8}
          >
            {filteredCategories?.map((category) => (
              <Box px={2} key={category?._id} cursor="pointer">
                {category?.name}
              </Box>
            ))}
          </Flex>
        )}

        {/* <HStack spacing={4}>
          {["sm", "md", "lg"].map((size) => (
            <Tag size="lg" key={size} variant="subtle" colorScheme="cyan">
              <TagLabel>Cyan</TagLabel>
            </Tag>
          ))}
        </HStack> */}
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

  const handleNext = async () => {
    const payload = {
      ...getValues(),
      plannedExpenses: Number(getValues()?.plannedExpenses) ?? 0,
      plannedIncome: Number(getValues()?.plannedIncome) ?? 0,
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

  const onSubmit = async () => {
    // Perform any final actions here
    console.log("Budget and budget items submitted successfully!", getValues());
    const payload = {
      ...getValues(),
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
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      await axios.request(config);
      setTimeout(function () {
        navigate(`/budget/items/${budget._id}`);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
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
