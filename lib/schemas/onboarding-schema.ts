import { z } from "zod";

export const onboardingSchema = z.object({
  academicBackground: z.object({
    educationLevel: z.enum(["high_school", "other", "undergraduate"], {
      invalid_type_error: "Por favor, indica un nivel educativo válido",
      required_error: "El nivel educativo es obligatorio",
    }),
    lastAttendedInstitution: z
      .string()
      .trim()
      .min(1, {
        message:
          "La institución actual o última debe tener al menos 1 carácter",
      })
      .max(50, {
        message:
          "La institución actual o última debe tener 300 caracteres o menos",
      })
      .optional()
      .or(z.literal("")),
    fieldOfStudyId: z.coerce
      .number({
        invalid_type_error: "Por favor, indica una carrera válida",
      })
      .optional(),
    graduationYear: z.coerce
      .number({
        invalid_type_error: "Por favor, indica un año de graduación válido",
      })
      .optional(),
    intendedFieldOfStudyId: z.coerce
      .number({
        invalid_type_error: "Por favor, indica una carrera válida",
      })
      .optional(),
  }),
  basicInformation: z.object({
    cityId: z.coerce.number({
      invalid_type_error: "Por favor, indica una comuna válida",
      required_error: "La comuna es obligatoria",
    }),
    countryId: z.coerce.number({
      invalid_type_error: "Por favor, indica un país válido",
      required_error: "El país es obligatorio",
    }),
    dateOfBirth: z.date({
      invalid_type_error: "Por favor, indica una fecha de nacimiento válida",
      required_error: "La fecha de nacimiento es obligatoria",
    }),
    firstName: z
      .string()
      .trim()
      .min(1, { message: "El nombre debe tener al menos 1 carácter" })
      .max(50, { message: "El nombre debe tener 50 caracteres o menos" }),
    gender: z
      .enum(["female", "male", "non_binary", "prefer_not_to_say"], {
        invalid_type_error: "Por favor, indica un género válido",
      })
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "El apellido debe tener al menos 1 carácter" })
      .max(50, { message: "El apellido debe tener 50 caracteres o menos" }),
    stateId: z.coerce.number({
      invalid_type_error: "Por favor, indica una región válida",
      required_error: "La región es obligatoria",
    }),
  }),
  personalInterests: z.object({
    extracurricularsIds: z.array(z.coerce.number()),
    additionalNotes: z
      .string()
      .trim()
      .min(1, {
        message: "Los datos adicionales deben tener al menos 1 carácter",
      })
      .max(500, {
        message: "Los datos adicionales deben tener 50 caracteres o menos",
      })
      .optional()
      .or(z.literal("")),
  }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
