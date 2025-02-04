"use server";

import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

import { createClient } from "@/utils/supabase/server";
import {
  onboardingSchema,
  type OnboardingSchema,
} from "@/lib/schemas/onboarding-schema";
import { translations } from "@/config/translations";
import type { Tables } from "@/types/database";

export type Scholarship = Pick<
  Tables<"scholarships">,
  "id" | "content" | "name" | "url"
>;

type MatchScholarshipsResponse = {
  data: Array<Scholarship> | null;
  message?: string;
  success: boolean;
};

const defaultTranslations = translations["es"];

export async function matchScholarships(
  body: OnboardingSchema,
): Promise<MatchScholarshipsResponse> {
  const supabase = await createClient();

  const validatedFields = onboardingSchema.safeParse(body);

  if (!validatedFields.success) {
    return {
      data: null,
      message: "Invalid form data.",
      success: false,
    };
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        data: null,
        message: "User not authenticated.",
        success: false,
      };
    }

    const { academicBackground, basicInformation, personalInterests } =
      validatedFields.data;

    // Save user data to `onboarding_profiles` table
    const { data: onboardingProfile, error: onboardingProfileError } =
      await supabase
        .from("onboarding_profiles")
        .insert({
          city_id: basicInformation.cityId,
          date_of_birth: basicInformation.dateOfBirth.toISOString(),
          education_level: academicBackground.educationLevel,
          field_of_study_id: academicBackground.fieldOfStudyId ?? null,
          first_name: basicInformation.firstName,
          gender: basicInformation.gender,
          intended_field_of_study_id:
            academicBackground.intendedFieldOfStudyId ?? null,
          last_name: basicInformation.lastName,
          onboarding_data: {
            additional_notes: personalInterests.additionalNotes ?? null,
            graduation_year: academicBackground.graduationYear ?? null,
            last_attended_institution:
              academicBackground.lastAttendedInstitution ?? null,
          },
          status: "completed",
          user_id: user.id,
        })
        .select(
          `
        id,
        city:cities (
          name,
          state:states (
            name
          )
        ),
        date_of_birth,
        education_level,
        field_of_study:fields_of_study!field_of_study_id (
          name
        ),
        first_name,
        gender,
        intended_field_of_study:fields_of_study!intended_field_of_study_id (
          name
        ),
        last_name,
        onboarding_data->additional_notes,
        onboarding_data->graduation_year,
        onboarding_data->last_attended_institution
        `,
        )
        .limit(1)
        .single();

    if (onboardingProfileError) {
      console.error("Database error:", onboardingProfileError.message);
      throw new Error("Error saving onboarding profile.");
    }

    // Save extracurricular activities to `user_extracurricular_activities` join table
    const { data: extracurriculars, error: extracurricularsError } =
      await supabase.from("user_extracurricular_activities").insert(
        personalInterests.extracurricularsIds.map((id) => ({
          activity_id: id,
          user_id: user.id,
        })),
      ).select(`
        extracurricular_activity:activity_id (
          name
        )
      `);

    if (extracurricularsError) {
      console.error("Database error:", extracurricularsError.message);
      throw new Error("Error saving extracurricular activities.");
    }

    const formattedProfile = `
      Región: ${onboardingProfile.city?.state?.name ?? "No informado"}.
      Comuna: ${onboardingProfile.city?.name ?? "No informado"}.
      Nivel de educación actual: ${onboardingProfile.education_level ? defaultTranslations["education_level"][onboardingProfile.education_level] : "No informado"}.
      Campo de estudio: ${onboardingProfile.field_of_study?.name ?? "No informado"}.
      Campo de estudio deseado: ${onboardingProfile.intended_field_of_study?.name ?? "No informado"}.
      Actividades extracurriculares: ${extracurriculars.length > 0 ? extracurriculars.map(({ extracurricular_activity }) => extracurricular_activity.name).join(",") : "No informado"}.
      Género: ${onboardingProfile.gender ? defaultTranslations["gender"][onboardingProfile.gender] : "No informado"}.
      Información adicional: ${onboardingProfile.additional_notes ?? "No informado"}.
    `;

    // Generate onboarding profile embedding
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: formattedProfile,
    });

    // Save embedding to onboarding profile
    const { error: onboardingProfileUpdateError } = await supabase
      .from("onboarding_profiles")
      .update({
        // Cast 'embedding' to 'string' to resolve Supabase type mismatch (array stored as string).
        embedding: embedding as unknown as string,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (onboardingProfileUpdateError) {
      console.error("Database error:", onboardingProfileUpdateError.message);
      throw new Error("Error updating onboarding profile.");
    }

    // Find relevant scholarships based on onboarding profile
    const { data: scholarships, error: scholarshipsError } = await supabase.rpc(
      "match_scholarships",
      {
        match_count: 10,
        match_threshold: 0.5,
        profile_embedding: embedding as unknown as string,
      },
    );

    if (scholarshipsError) {
      console.error("Database error:", scholarshipsError.message);
      throw new Error("Error generating scholarship match.");
    }

    // Save match
    const { data: matchResults, error: matchResultsError } = await supabase
      .from("match_results")
      .insert({ onboarding_profile_id: onboardingProfile.id })
      .select();

    if (matchResultsError) {
      console.error("Database error:", matchResultsError.message);
      throw new Error("Error saving match.");
    }

    if (!scholarships.length) {
      // Early return when no matches are found
      return {
        data: [],
        success: true,
      };
    }

    // Save match scholarships
    const { error: matchScholarshipsError } = await supabase
      .from("match_scholarships")
      .insert(
        scholarships.map((scholarship) => ({
          match_result_id: matchResults[0].id,
          scholarship_id: scholarship.id,
        })),
      );

    if (matchScholarshipsError) {
      console.error("Database error:", matchScholarshipsError.message);
      throw new Error("Error saving match scholarships.");
    }

    return {
      data: scholarships,
      success: true,
    };
  } catch (error) {
    console.error(
      "Server error:",
      error instanceof Error ? error.message : error,
    );
    return {
      data: null,
      message: "An unexpected error occurred. Please try again later",
      success: false,
    };
  }
}
