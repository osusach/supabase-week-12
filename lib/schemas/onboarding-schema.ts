import { z } from "zod";

export const onboardingSchema = z.object({
  academicBackground: z.object({
    educationLevel: z.enum(["high_school", "other", "undergraduate"], {
      invalid_type_error: "Education level is not valid",
      required_error: "Education level is required",
    }),
    lastAttendedInstitution: z
      .string()
      .trim()
      .min(1, {
        message:
          "Current or last institution must be 1 or more characters long",
      })
      .max(50, {
        message:
          "Current or last institution must be 50 or fewer characters long",
      })
      .optional()
      .or(z.literal("")),
    fieldOfStudyId: z.coerce
      .number({ invalid_type_error: "Field of study is not valid" })
      .optional(),
    graduationYear: z.coerce
      .number({ invalid_type_error: "Graduation year is not valid" })
      .optional(),
    intendedFieldOfStudyId: z.coerce
      .number({ invalid_type_error: "Intended field of study is not valid" })
      .optional(),
  }),
  basicInformation: z.object({
    cityId: z.coerce.number({
      invalid_type_error: "City is not valid",
      required_error: "City is required",
    }),
    countryId: z.coerce.number({
      invalid_type_error: "Country is not valid",
      required_error: "Country is required",
    }),
    dateOfBirth: z.coerce.date({
      invalid_type_error: "Date of birth is not valid",
      required_error: "Date of birth is required",
    }),
    firstName: z
      .string()
      .trim()
      .min(1, { message: "First name must be 1 or more characters long" })
      .max(50, { message: "First name must be 50 or fewer characters long" }),
    gender: z
      .enum(["female", "male", "non_binary", "prefer_not_to_say"], {
        invalid_type_error: "Gender is not valid",
      })
      .optional(),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name must be 1 or more characters long" })
      .max(50, { message: "Last name must be 50 or fewer characters long" }),
    stateId: z.coerce.number({
      invalid_type_error: "State is not valid",
      required_error: "State is required",
    }),
  }),
  personalInterests: z.object({
    extracurricularsIds: z.array(z.coerce.number()),
    additionalNotes: z
      .string()
      .trim()
      .min(1, { message: "Additional notes must be 1 or more characters long" })
      .max(500, {
        message: "Additional notes must be 500 or fewer characters long",
      })
      .optional()
      .or(z.literal("")),
  }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
