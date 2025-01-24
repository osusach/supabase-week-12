export const birthYears = Array.from({ length: 100 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { label: year, value: year.toString() };
});

export const educationLevels = [
  { label: "High School", value: "high_school" },
  { label: "Undergraduate", value: "undergraduate" },
  { label: "Other", value: "other" },
];

export const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-binary", value: "non_binary" },
  { label: "Prefer not to say", value: "prefer_not_to_say" },
];

export const graduationYears = Array.from({ length: 15 }, (_, i) => {
  const year = new Date().getFullYear() - 10 + i;
  return { label: year, value: year.toString() };
});

export const months = [
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
