import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

function ConfirmDeleteModal({ isOpen, onClose, deleteHandler }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want to continue?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          This is irreversable and will permanently delete this item. Click Yes
          if you want to continue
        </ModalBody>

        <ModalFooter>
          <Button onClick={deleteHandler} mr={3}>
            Yes
          </Button>
          <Button variant="secondary" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmDeleteModal;
