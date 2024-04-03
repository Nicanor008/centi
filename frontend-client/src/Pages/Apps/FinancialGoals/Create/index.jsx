import React from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import {
  Flex,
  Text,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { getUserToken } from "../../../../helpers/getToken";
import { config } from "../../../../config";
import { useState } from "react";

const CreateFinancialGoal = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { getValues, reset } = methods;
  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const [userCategories, setUserCategories] = React.useState([]);
  const userToken = getUserToken();
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    const payload = {
      ...getValues(),
      category: selectedCategory,
      targetAmount: Number(getValues()?.targetAmount) ?? 0,
    };

    let payloadConfig = {
      method: "post",
      url: `${config.API_URL}/financial-goals/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: payload,
    };

    try {
      // submit data
      await axios.request(payloadConfig);

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
        navigate(`/financial-goals`);
      }, 1000);
    } catch (error) {
      setSubmitting(false);
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
            variant="secondary"
            onClick={() => navigate("/financial-goals")}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>

      {/* body */}
      <FormProvider {...methods}>
        <VStack spacing={4} alignItems="left">
          <Flex gap={4} flexDir={["column", "row"]}>
            <FormControl id="name">
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                placeholder="Financial Goal Name"
                {...methods.register("name")}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                placeholder="Financial Goal Description"
                {...methods.register("description")}
              />
            </FormControl>
          </Flex>
          <Flex w="100%" gap={4} flexDir={["column", "row"]}>
            <FormControl id="targetAmount">
              <FormLabel htmlFor="targetAmount">Target Amount</FormLabel>
              <Input
                placeholder="Target Amount"
                {...methods.register("targetAmount")}
                type="number"
              />
            </FormControl>
            <FormControl id="from">
              <FormLabel htmlFor="from">Starting Date</FormLabel>
              <Input
                placeholder="Goal Starts from"
                {...methods.register("from")}
                type="date"
              />
            </FormControl>
            <FormControl id="to">
              <FormLabel htmlFor="to">End Date</FormLabel>
              <Input
                placeholder="Goal ends on"
                {...methods.register("to")}
                type="date"
              />
            </FormControl>
          </Flex>
          <FormControl id="from" mb={4}>
            <FormLabel htmlFor="from">Category</FormLabel>
            <CreatableSelect
              isMulti
              isCreatable
              options={userCategories}
              value={selectedCategory}
              onChange={handleSelectedCategory}
              placeholder="Budget is advisable to have one or multiple categories"
            />
          </FormControl>
        </VStack>
        <Flex gap={2}>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button
            onClick={() => onSubmit()}
            type="submit"
            isLoading={submitting}
          >
            Submit
          </Button>
        </Flex>
      </FormProvider>
    </Flex>
  );
};

export default CreateFinancialGoal;
