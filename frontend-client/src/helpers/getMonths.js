const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonthName(number) {
  // Subtract 1 to adjust for array indexing
  const index = number - 1;

  // Check if the index is valid
  if (index >= 0 && index < months.length) {
    return months[index];
  } else {
    return "Invalid Month"; // Or handle invalid input however you want
  }
}
