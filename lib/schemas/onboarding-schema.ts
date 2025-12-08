import { z } from "zod";

export const onboardingSchema = z.object({
  academicBackground: z.object({
    educationLevel: z.enum(["high_school", "other", "undergraduate"], {
      error: "Por favor, indica un nivel educativo válido",
    }),
    lastAttendedInstitution: z
      .string()
      .trim()
      .min(1, "La institución actual o última debe tener al menos 1 carácter")
      .max(
        50,
        "La institución actual o última debe tener 300 caracteres o menos",
      )
      .optional()
      .or(z.literal("")),
    fieldOfStudyId: z.coerce
      .number("Por favor, indica una carrera válida")
      .optional(),
    graduationYear: z.coerce
      .number("Por favor, indica un año de graduación válido")
      .optional(),
    intendedFieldOfStudyId: z.coerce
      .number("Por favor, indica una carrera válida")
      .optional(),
  }),
  basicInformation: z.object({
    cityId: z.coerce.number("Por favor, indica una comuna válida"),
    countryId: z.coerce.number("Por favor, indica un país válido"),
    dateOfBirth: z.date("Por favor, indica una fecha de nacimiento válida"),
    firstName: z
      .string()
      .trim()
      .min(1, { message: "El nombre debe tener al menos 1 carácter" })
      .max(50, { message: "El nombre debe tener 50 caracteres o menos" }),
    gender: z
      .enum(["female", "male", "non_binary", "prefer_not_to_say"], {
        error: "Por favor, indica un género válido",
      })
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "El apellido debe tener al menos 1 carácter" })
      .max(50, { message: "El apellido debe tener 50 caracteres o menos" }),
    stateId: z.coerce.number("Por favor, indica una región válida"),
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
