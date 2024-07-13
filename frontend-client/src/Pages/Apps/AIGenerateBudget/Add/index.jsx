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
  useToast
} from "@chakra-ui/react";
import { config } from '../../../../config';

const AddAIGenerateBudget = () => {
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [generatedBudget, setGeneratedBudget] = useState('');
  const toast = useToast();

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
    <Flex direction="column" align="center" justify="center" p={4}>
      <Box w="100%" maxW="md" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading mb={6} fontFamily="inherit">Generate Budget Plan</Heading>
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
  );
};

export default AddAIGenerateBudget;
