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
import { useNavigate } from 'react-router-dom';

const AddAIGenerateBudget = () => {
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [generatedBudget, setGeneratedBudget] = useState('');
  const toast = useToast();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.API_URL}/generate-budget`, { userBudget: budget, userDescription: description })
      setGeneratedBudget(response.data.budget);
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
    <Flex direction="column" h="89vh">
        <Flex
            py={4}
            justifyContent="space-between"
            alignItems="center"
            mb={[1, 4]}
        >
        <Flex flexDir="column">
          <Text fontWeight={600} fontSize={16}>
            AI Generated Budget
          </Text>
          <Text color="gray.500" fontSize={12} fontWeight={400}>
            This uses generative ai to generate for you ai according to the budget and description you want
          </Text>
        </Flex>

        <Flex mr={[0, 8]}>
          <Button variant="secondary" onClick={() => navigate("/generate-budget")}>
            Cancel
          </Button>
        </Flex>
      </Flex>

      <Divider />

      <Flex align="center" justify="center" p={4} my={4} h="100%">
        <Box w="100%" maxW="md" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
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
            {generatedBudget && (
            <Box mt={4} p={4} borderWidth={1} borderRadius="lg">
                <Heading size="md" mb={2}>Generated Budget Plan</Heading>
                <Text>{generatedBudget}</Text>
            </Box>
            )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AddAIGenerateBudget;
