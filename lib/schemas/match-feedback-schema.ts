import { z } from "zod";

export const matchFeedbackSchema = z.object({
  contactPermission: z.enum(["yes", "no"], {
    error: "Por favor, indica una preferencia de contacto válida",
  }),
  improvementNotes: z
    .string("Por favor, indica un feedback válido")
    .trim()
    .max(300, {
      message: "El feedback debe tener 300 caracteres o menos",
    })
    .optional(),
  matchRelevanceRating: z.coerce
    .number("Por favor, indica una calificación válida")
    .min(1, "Por favor, indica una calificación de al menos 1")
    .max(5, "Por favor, indica una calificación de no más de 5"),
});

export type MatchFeedbackSchema = z.infer<typeof matchFeedbackSchema>;
