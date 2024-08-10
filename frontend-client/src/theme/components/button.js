import { defineStyleConfig } from "@chakra-ui/react";

/**
 * Base style, these styles apply to all variants and sizes.
 */

const baseStyle = {
  fontWeight: "500",
  rounded: "full",
  _focusVisible: {
    boxShadow: `0 0 0 2px var(--chakra-colors-red-200)`,
  },
  _disabled: {
    opacity: 0.8,
  },
};

/**
 * Variants
 */
const primary = {
  bg: "red.400",
  color: "white",
  _active: {
    bg: "red.400",
  },
  _disabled: {
    bg: "gray.300",
    _hover: {
      color: "black.500",
    },
  },
};

const secondary = {
  bg: "gray.300",
  color: "black",
  border: "1px solid",
  borderColor: "red.200",
  _active: {
    bg: "red.100",
  },
  _disabled: {
    bg: "gray.100",
    _hover: {
      color: "red.500",
    },
  },
};

const ghost = {
  bg: "white",
  borderColor: "gray.300",
  borderWidth: "1px",
  color: "gray.700",
  _active: {
    bg: "gray.100",
  },
  _disabled: {
    bg: "white",
    borderColor: "gray.200",
  },
  _focusVisible: {
    boxShadow: `0 0 0 2px var(--chakra-colors-gray-200)`,
  },
};

const variants = {
  primary,
  secondary,
  ghost,
};

/**
 * Sizes
 */

const sizes = {
  xs: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  sm: {
    fontSize: "14px",
    lineHeight: "20px",
  },
  md: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  lg: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  xl: {
    fontSize: "18px",
    lineHeight: "24px",
  },
};
/**
 * Full button style configuration
 */

const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "primary",
  },
});

export default buttonTheme;
