import {
  Button,
  Flex,
  Stepper,
  Step,
  Box,
  Text,
  useSteps,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepIcon,
  StepNumber,
  StepSeparator,
} from "@chakra-ui/react";

const steps = [
  { title: "Create Budget", description: "Contact Info" },
  { title: "Add Items", description: "Date & Time" },
  { title: "Finish", description: "Date & Time" },
];

function CreateUserBudgets() {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

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
          <Button bg="red.400" color="white">
            Cancel
          </Button>
        </Flex>
      </Flex>
      {/* view all budgets - content */}
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Flex>
  );
}

export default CreateUserBudgets;
