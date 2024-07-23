import React, { useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  Text,
  useToast,
  Divider
} from "@chakra-ui/react";
import { config } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import FormatAIGeneratedBudgetItem from '../View/FormatAIGeneratedBudgetItem';
import { getUserToken } from '../../../../helpers/getToken';

const AddAIGenerateBudget = () => {
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [generatedBudget, setGeneratedBudget] = useState('');
  const toast = useToast();
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHomepage = pathname === '/user-generate-budget'
  const userToken = getUserToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.API_URL}/generate-budget`, { userBudget: budget, userDescription: description }, { headers: { Authorization: `Bearer ${userToken}` } })
      setGeneratedBudget(response.data.data);
      toast({
        title: "Budget generated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error generating budget:', error);
      toast({
        title: "Error generating budget.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" mx={isHomepage ? '6rem' : 2} minH="70vh" w="100%">
      <Flex flexDir="column" overflow="scroll" align="center" justify="space-evenly" p={4} h="100%">
      <Flex
            justifyContent="space-between"
            alignItems="center"
            mb={[1, 4]}
            w="100%"
        >
        <Flex flexDir="column">
          <Text fontWeight={600} fontSize={16}>
            AI Generated Budget
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            This uses generative ai to generate for you ai according to the budget and description you want
          </Text>
        </Flex>

        {!isHomepage && (
            <Flex mr={[0, 8]}>
                <Button variant="secondary" onClick={() => navigate("/generate-budget")}>
                    Cancel
                </Button>
            </Flex>
        )}
      </Flex>

      <Divider />

        <Box w="100%" maxW="md" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" mt={8}>
            <Text fontSize="xl" mb={6} fontWeight="Bolder" >Generate Budget Plan</Text>
            <form onSubmit={handleSubmit}>
            <FormControl id="budget" mb={4}>
                <FormLabel>Budget</FormLabel>
                <Input
                    type="input"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    placeholder="$50"
                />
            </FormControl>
            <FormControl id="description" mb={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    bg="white"
                    placeholder='Generate budget for a new campus student joining a mid-level college in Michigan'
                />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full" mb={4}>
                Generate Budget
            </Button>
            </form>
        </Box>
            {generatedBudget && (
                <Box mt={4} p={4} borderWidth={1} borderRadius="lg">
                    <Heading size="md" mb={2} fontFamily="inherit">Generated Budget Plan</Heading>
                    <FormatAIGeneratedBudgetItem data={generatedBudget.generatedBudget.message.content} />
                </Box>
            )}
      </Flex>
    </Flex>
  );
};

export default AddAIGenerateBudget;
