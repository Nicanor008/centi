import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, FormProvider, Controller } from "react-hook-form";
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
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
import { config } from "../../../../config";
import { getUserToken } from "../../../../helpers/getToken";

const CreateSavingGoal = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { getValues, reset } = methods;
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [financialGoals, setFinancialGoals] = useState([]);
  const [selectedFinancialGoal, setSelectedFinancialGoal] = useState([]);

  const [userCategories, setUserCategories] = useState([]);
  const userToken = getUserToken();
  const [isLargerThan880] = useMediaQuery("(min-width: 880px)");
  const [submitting, setSubmitting] = useState(false);

  const handleSelectedCategory = async (selected) => {
    setSelectedCategory(selected);
  };

  useEffect(() => {
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

  useEffect(() => {
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

  const onSubmit = async () => {
    setSubmitting(true);
    const payload = {
      ...getValues(),
      category: selectedCategory,
      financialGoal: selectedFinancialGoal,
      targetAmount: Number(getValues()?.targetAmount),
      currentAmount: Number(getValues()?.currentAmount),
    };

    let payloadConfig = {
      method: "post",
      url: `${config.API_URL}/savings/`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      // submit data
      await axios.request(payloadConfig);

      setSelectedCategory([]);
      reset();
      setSubmitting(false);
      setTimeout(function () {
        navigate(`/savings/view`);
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <Flex flexDir="column">
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
            Create a Savings Goal
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            Track your savings cycle
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
        <VStack spacing={4} alignItems="left">
          <Flex gap={4} flexDir={["column", "row"]}>
            <FormControl id="savingsGoalName" required>
              <FormLabel htmlFor="savingsGoalName">Name</FormLabel>
              <Input
                placeholder="Savings Goal Name"
                {...methods.register("savingsGoalName")}
              />
            </FormControl>
            <FormControl id="targetAmount" required>
              <FormLabel htmlFor="targetAmount">Target</FormLabel>
              <Controller
              control={methods.control}
              name="targetAmount"
              render={( { field } ) => (
                <NumericFormat
                  prefix="KES "
                  placeholder="Savings Goal Target amount"
                  thousandSeparator
                  customInput={Input}
                  onValueChange={(v) => field.onChange(v.value)}
                />
              )}
            />
            </FormControl>
            <FormControl id="currentAmount">
              <FormLabel htmlFor="currentAmount">Current Savings</FormLabel>
              <Controller
              control={methods.control}
              name="currentAmount"
              render={( { field } ) => (
                <NumericFormat
                  prefix="KES "
                  placeholder="Currently saved amount"
                  thousandSeparator
                  customInput={Input}
                  onValueChange={(v) => field.onChange(v.value)}
                />
              )}
            />
            </FormControl>
          </Flex>
          <Flex gap={4} flexDir={["solumn", "row"]}>
            <FormControl id="maturityDate">
              <FormLabel htmlFor="maturityDate">Maturity Date</FormLabel>
              <Input
                placeholder="Maturity Date"
                {...methods.register("maturityDate")}
                type="date"
              />
            </FormControl>
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
        <div>
          <Button
            variant="secondary"
            mt={8}
            onClick={() => navigate(-1)}
            mr={4}
          >
            Back
          </Button>
          <Button
            mt={(2, 8)}
            onClick={() => onSubmit()}
            type="submit"
            isLoading={submitting}
          >
            Submit
          </Button>
        </div>
      </FormProvider>
    </Flex>
  );
};

export default CreateSavingGoal;
