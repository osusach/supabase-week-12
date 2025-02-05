import { z } from "zod";

export const matchFeedbackSchema = z.object({
  contactPermission: z.enum(["yes", "no"], {
    invalid_type_error: "Please indicate a valid contact preference",
    required_error: "Contact preference is required",
  }),
  improvementNotes: z
    .string({ invalid_type_error: "Please indicate a valid feedback" })
    .trim()
    .max(300, { message: "Feedback must be 300 characters or fewer" })
    .optional(),
  matchRelevanceRating: z.coerce
    .number({
      invalid_type_error: "Please indicate a valid relevance rating",
      required_error: "Relevance rating is required",
    })
    .min(1, { message: "Please provide a relevance rating of at least 1" })
    .max(5, { message: "Please provide a relevance rating of no more than 5" }),
});

export type MatchFeedbackSchema = z.infer<typeof matchFeedbackSchema>;
