export const formatNumberGroups = (number) => {
  const reversedNumberString = number
    ?.toString()
    ?.split("")
    ?.reverse()
    ?.join("");
  const formattedString = reversedNumberString?.replace(/(\d{3})/g, "$1,");
  const result = formattedString
    ?.split("")
    ?.reverse()
    ?.join("")
    ?.replace(/^,/, "");

  return result;
};
