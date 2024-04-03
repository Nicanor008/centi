const selectionColor = {
  _selection: {
    backgroundColor: "secondaryOpaqueBrand",
  },
};

const textStyles = {
  caption: {
    fontSize: "12px",
    lineHeight: "14px",
    ...selectionColor,
  },
  p: {
    fontSize: "16px",
    lineHeight: 1.4,
    ...selectionColor,
  },
  h1: {
    fontSize: ["48px", "72px"],
    fontWeight: 900,
    lineHeight: 1,
    ...selectionColor,
  },
  h2: {
    fontSize: ["36px", "48px"],
    lineHeight: 1,
    ...selectionColor,
  },
  h3: {
    fontSize: ["24px", "28px"],
    fontWeight: "semibold",
    lineHeight: 1.2,
    ...selectionColor,
  },
  h4: {
    fontSize: ["18px", "24px"],
    lineHeight: ["20px", "24px"],
    ...selectionColor,
  },
  h5: {
    fontSize: ["16px", "18px"],
    fontWeight: "semibold",
    lineHeight: 1.2,
    ...selectionColor,
  },
};

export default { textStyles };
