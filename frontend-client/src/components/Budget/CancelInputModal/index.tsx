import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button
} from "@chakra-ui/react"
import React from "react"

function CancelInputModal({
    isOpen,
    onClose,
    setCreateAIBudget,
    setBudget,
    setDescription,
}) {
    const closeModal = () => {
        setCreateAIBudget(false)
        setBudget("")
        setDescription("")
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure you want to continue</ModalHeader>

                <ModalCloseButton />

                <ModalBody>
                    You'll loose all your data in the input form. You can finish or continue here to delete the data input
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={closeModal}>Continue</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CancelInputModal
