import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const primary = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: "gray.200",
    background: "#FFF",
    rounded: 8,
  },
  addon: {
    border: "1px solid",
    borderColor: "gray.200",
    background: "gray.200",
    rounded: 8,
    color: "gray.500",
  },
  element: {},
});

const outline = definePartsStyle({
  field: {
    border: "2px solid",
    borderColor: "blue.500",
  },
});

const Input = defineMultiStyleConfig({
  variants: { primary, outline },
  defaultProps: {
    variant: "primary",
  },
});

export default Input;
