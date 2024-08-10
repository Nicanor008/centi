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
  useToast,
  Center,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { config } from '../../../../config';
import { getUserToken } from '../../../../helpers/getToken';
import SubmitInputLoader from '../SubmitInputLoader';
import { CancelInputModal } from '../../../../components';

const AddAIGenerateBudget = ({ setMessageSent }) => {
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();
  const userToken = getUserToken();
  const [createAIBudget, setCreateAIBudget] = useState(false)
  const [submittingMessage, setSubmittingMessage] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittingMessage(true)

    try {
      await axios.post(
        `${config.API_URL}/generate-budget`, 
        { userBudget: budget, userDescription: description }, 
        { headers: { Authorization: `Bearer ${userToken}` }}
      )
      setSubmittingMessage(false)
      setMessageSent(true)
      toast({
        title: "Budget generated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setBudget("")
      setDescription("")
      setCreateAIBudget(false)
    } catch (error) {
      console.error('Error generating budget:', error);
      setSubmittingMessage(false)
      setCreateAIBudget(false)
      toast({
        title: "Error generating budget.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const isDescriptionActive = description.length < 1;
  const isBudgetActive = budget.length < 1;

  return (
    <Box w="100%" position="relative">
      {!createAIBudget ? (
        <Center>
          <Button onClick={() => setCreateAIBudget(true)}>
            Generate New Budget
          </Button>
        </Center>
      ) : (
        submittingMessage ? <SubmitInputLoader /> : (
          <form onSubmit={handleSubmit}>
             <IconButton
              aria-label="Close"
              icon={<CloseIcon />}
              position="absolute"
              top="4px"
              right="4px"
              size="xs"
              bg="red.300"
              boxShadow="lg"
              onClick={
                () => (isDescriptionActive && isBudgetActive) ? setCreateAIBudget(false) : onOpen()
              }
            />
            <Flex flexDir="column">
              <FormControl id="budget" mb={1} w="fit-content">
                <FormLabel>What's your Budget amount</FormLabel>
                <Input
                    type="input"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="$50"
                />
              </FormControl>
              <FormControl id="description" mb={1}>
                <FormLabel>Describe what you want to achieve</FormLabel>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    bg="white"
                    w="100%"
                    placeholder='Generate budget for a new campus student joining a mid-level college in Michigan'
                />
              </FormControl>
              <Flex gap={4} mt={3} alignItems="center">
                <Button
                  variant="ghost"
                  width="full"
                  onClick={
                    () => (isDescriptionActive && isBudgetActive) ? setCreateAIBudget(false) : onOpen()
                  }
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  width="full"
                  isLoading={submittingMessage}
                  isDisabled={description.length < 1}
                  bg={isDescriptionActive ? 'gray.300' : 'red.400'}
                  _hover={{
                    bg: isDescriptionActive ? 'gray.300' : 'red.400'
                  }}
                >
                  Generate Budget
                </Button>
              </Flex>
              </Flex>
          </form>
      ))}
      <CancelInputModal
        isOpen={isOpen}
        onClose={onClose}
        setCreateAIBudget={setCreateAIBudget}
        setBudget={setBudget}
        setDescription={setDescription}
      />
    </Box>
  );
};

export default AddAIGenerateBudget;
