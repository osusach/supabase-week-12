import { z } from "zod";

export const matchFeedbackSchema = z.object({
  contactPermission: z.enum(["yes", "no"], {
    invalid_type_error: "Por favor, indica una preferencia de contacto válida",
    required_error: "La preferencia de contacto es obligatoria",
  }),
  improvementNotes: z
    .string({
      invalid_type_error: "Por favor, indica un feedback válido",
    })
    .trim()
    .max(300, {
      message: "El feedback debe tener 300 caracteres o menos",
    })
    .optional(),
  matchRelevanceRating: z.coerce
    .number({
      invalid_type_error: "Por favor, indica una calificación válida",
      required_error: "La calificación es obligatoria",
    })
    .min(1, {
      message: "Por favor, indica una calificación de al menos 1",
    })
    .max(5, {
      message: "Por favor, indica una calificación de no más de 5",
    }),
});

export type MatchFeedbackSchema = z.infer<typeof matchFeedbackSchema>;
