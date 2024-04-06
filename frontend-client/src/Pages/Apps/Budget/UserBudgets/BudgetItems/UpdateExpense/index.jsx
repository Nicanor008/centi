import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

function UpdateExpense({ selectedItem, isOpen, onOpen, onClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const methods = useForm({
    defaultValues: {
      actualExpenses: selectedItem.actualExpenses,
    },
  });

  const onSubmit = () => {
    console.log(".......");
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Update Expense</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Expense name</FormLabel>
                <Input
                  placeholder="Last name"
                  {...methods.register("name")}
                  disabled
                />
              </FormControl>
              <FormControl>
                <FormLabel>Expense</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="First name"
                  {...methods.register("actualExpenses")}
                  type="number"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default UpdateExpense;
