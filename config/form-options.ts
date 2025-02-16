export const birthYears = Array.from({ length: 100 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { label: year, value: year.toString() };
});

export const educationLevels = [
  { label: " Enseñanza Media", value: "high_school" },
  { label: "Pregrado", value: "undergraduate" },
  { label: "Postgrado", value: "other" },
];

export const genders = [
  { label: "Masculino", value: "male" },
  { label: "Femenino", value: "female" },
  { label: "No binario", value: "non_binary" },
  { label: "Prefiero no decir", value: "prefer_not_to_say" },
];

export const graduationYears = Array.from({ length: 15 }, (_, i) => {
  const year = new Date().getFullYear() - 10 + i;
  return { label: year, value: year.toString() };
});

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
