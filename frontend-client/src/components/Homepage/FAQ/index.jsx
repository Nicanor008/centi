import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";

const faqData = [
  {
    question: "What is Centi and how does it work?",
    answer:
      "Centi is a personal financial management tool to foster progress towards self financial independence. It entails budgeting, savings and tracking financial goals.",
  },
  {
    question: "Is my financial data secure with Centi?",
    answer: "Yes. We confidential encrpt all users data from end to end.",
  },
  {
    question: "Can I access Centi from any device?",
    answer:
      "Yes. Centi is a web app platform that can be accessed on any device with a browser",
  },
  {
    question: "How can Centi help me with budgeting?",
    answer:
      "Centi helps you manage and track budget, savings and financial goals. You create budget for a specific period of time, add or update expenses on a specific budget",
  },
  {
    question: "What types of savings goals can I set with Centi?",
    answer:
      "Any goals you need. Whether it's emergency funds, vacation, mortgage, etc",
  },
  {
    question: "Does Centi offer personalized financial advice?",
    answer:
      "Not at the moment, with time, we shall launch this service in future",
  },
  {
    question:
      "Can I sync my bank accounts and credit cards with my Centi account?",
    answer:
      "No. Not at the moment, we are still working on integration and getting the right certification to be confirmed",
  },
];

const FAQ = () => {
  return (
    <Flex p={8} w={["100%", "50%"]} alignSelf="center">
      <Accordion allowMultiple defaultIndex={0}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          FAQs
        </Text>

        {faqData.map((faqItem) => (
          <AccordionItem key={faqItem.question}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontWeight="semibold">{faqItem.question}</Text>
              </Box>
            </AccordionButton>
            <AccordionPanel pb={4}>{faqItem.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};

export default FAQ;
