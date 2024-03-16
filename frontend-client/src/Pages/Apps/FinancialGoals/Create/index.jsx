import React from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { Flex, Text, Button, Input, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

const CreateFinancialGoal = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { getValues, reset } = methods;
  const { state } = useLocation();
  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const [userCategories, setUserCategories] = React.useState([]);

  React.useEffect(() => {
    async function makeRequest() {
      try {
        const response = await axios.get(
          "http://localhost:4005/api/v1/category"
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

  const onSubmit = async () => {
    const payload = {
      ...getValues(),
      category: selectedCategory,
      targetAmount: Number(getValues()?.targetAmount) ?? 0,
    };

    let config = {
      method: "post",
      url: "http://localhost:4005/api/v1/financial-goals/",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      // submit data
      await axios.request(config);

      // add category
      removedUndefinedInCategory?.length > 0 &&
        (await axios.post(
          "http://localhost:4005/api/v1/category/",
          removedUndefinedInCategory
        ));

      setSelectedCategory([]);
      reset();
      setTimeout(function () {
        navigate(`/financial-goals`);
      }, 1000);
    } catch (error) {
      console.log(error);
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
            Create Financial Goal
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            Create a unique financial goal to help you achieve your goal in an
            awesome way
          </Text>
        </Flex>

        <Flex mr={[0, 8]}>
          <Button
            bg="red.400"
            color="white"
            onClick={() => navigate("/financial-goals")}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>

      {/* body */}
      <FormProvider {...methods}>
        <VStack spacing={4}>
          <Input
            placeholder="Financial Goal Name"
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
            placeholder="Financial Goal Description"
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
            placeholder="Target Amount"
            bg={"gray.100"}
            border="1px solid"
            borderColor="gray.300"
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            {...methods.register("targetAmount")}
            type="number"
          />
          <Flex w="100%" gap={4}>
            <Input
              placeholder="Goal Starts from"
              bg={"gray.100"}
              border="1px solid"
              borderColor="gray.300"
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
              {...methods.register("from")}
              type="date"
            />
            <Input
              placeholder="Goal ends on"
              bg={"gray.100"}
              border="1px solid"
              borderColor="gray.300"
              color={"gray.500"}
              _placeholder={{
                color: "gray.500",
              }}
              {...methods.register("to")}
              type="date"
            />
          </Flex>
          <CreatableSelect
            isMulti
            isCreatable
            options={userCategories}
            // styles={customStyles}
            value={selectedCategory}
            onChange={handleSelectedCategory}
          />
        </VStack>
        <Flex gap={2}>
          <Button
            bg="gray.400"
            color={"white"}
            onClick={() => navigate(-1)}
            _hover={{
              bg: "gray.400",
              boxShadow: "xl",
            }}
          >
            Back
          </Button>
          <Button
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
        </Flex>
      </FormProvider>
    </Flex>
  );
};

export default CreateFinancialGoal;
