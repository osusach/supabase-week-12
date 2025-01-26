import { z } from "zod";

export const onboardingSchema = z.object({
  academicBackground: z.object({
    educationLevel: z.enum(["high_school", "other", "undergraduate"]),
    currentOrLastInstitution: z.string().optional(),
    fieldOfStudyId: z.coerce.number().nullable(),
    graduationYear: z.coerce.number().nullable(),
    intendedFieldOfStudyId: z.coerce.number().nullable(),
  }),
  basicInformation: z.object({
    cityId: z.coerce.number(),
    countryId: z.coerce.number(),
    dateOfBirth: z.coerce.date(),
    firstName: z.string(),
    gender: z.enum(["female", "male", "non_binary", "prefer_not_to_say"]),
    lastName: z.string(),
    stateId: z.coerce.number(),
  }),
  personalInterests: z.object({
    extracurricularsIds: z.array(z.coerce.number()),
    additionalNotes: z.string().optional(),
  }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
