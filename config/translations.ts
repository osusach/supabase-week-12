import type { Enums } from "@/types/database";

type Languages = "es";

type TranslationKeys = "education_level" | "gender";

type Translations = {
  [lang in Languages]: {
    [key in TranslationKeys]: {
      [value: string]: string;
    };
  };
};

export const translations: Translations = {
  es: {
    gender: {
      female: "Femenino",
      male: "Masculino",
      non_binary: "No binario",
      prefer_not_to_say: "Prefiero no decir",
    },
    education_level: {
      high_school: "Enseñanza Media",
      other: "Otro",
      undergraduate: "Pregrado",
    },
  },
};
