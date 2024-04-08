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
import axios from "axios";
import { useForm } from "react-hook-form";
import { config } from "../../../../../../config";
import { getUserToken } from "../../../../../../helpers/getToken";

function UpdateExpense({ selectedItem, isOpen, onClose, setManualRefresh }) {
  const methods = useForm({
    defaultValues: {
      name: selectedItem?.name ?? "",
      actualExpenses: selectedItem?.actualExpenses ?? "",
    },
  });
  const userToken = getUserToken();

  const onSubmit = async () => {
    setManualRefresh(true);
    const payload = {
      ...methods.getValues(),
      actualExpenses: Number(methods.getValues()?.actualExpenses),
    };

    try {
      await axios.patch(
        `${config.API_URL}/budget-items/${selectedItem._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setManualRefresh(false);
      onClose();
    } catch (error) {
      setManualRefresh(false);
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Update Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Expense name</FormLabel>
              <Input {...methods.register("name")} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>Expense</FormLabel>
              <Input
                {...methods.register("actualExpenses")}
                type="number"
                autoFocus
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={methods.formState.isSubmitting}
              type="submit"
            >
              Save
            </Button>
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default UpdateExpense;
