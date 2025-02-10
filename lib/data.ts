import { createClient } from "@/utils/supabase/server";
import type { MatchResult } from "@/actions/scholarships";
import type { Json, Tables } from "@/types/database";

export type City = Pick<Tables<"cities">, "id" | "name" | "state_id">;

export async function fetchCities(): Promise<City[]> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("cities")
      .select("id, name, state_id")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch cities list.");
  }
}

export type Country = Pick<Tables<"countries">, "id" | "name">;

export async function fetchCountries(): Promise<Country[]> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("countries")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch countries list.");
  }
}

export type ExtracurricularActivity = Pick<
  Tables<"extracurricular_activities">,
  "id" | "name"
>;

export async function fetchExtracurricularActivities(): Promise<
  ExtracurricularActivity[]
> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("extracurricular_activities")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch extracurricular activities list.");
  }
}

export type FieldOfStudy = Pick<Tables<"fields_of_study">, "id" | "name">;

export async function fetchFieldsOfStudy(): Promise<FieldOfStudy[]> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("fields_of_study")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch fields of study list.");
  }
}

export async function fetchFormOptions(): Promise<
  [City[], Country[], ExtracurricularActivity[], FieldOfStudy[], State[]]
> {
  const cities = fetchCities();
  const countries = fetchCountries();
  const extracurricularActivities = fetchExtracurricularActivities();
  const fieldsOfStudy = fetchFieldsOfStudy();
  const states = fetchStates();

  const data = await Promise.all([
    cities,
    countries,
    extracurricularActivities,
    fieldsOfStudy,
    states,
  ]);

  return data;
}

export type MatchFeedback = {
  match_relevance_rating: number;
};

export type OnboardingProfile = Omit<
  Tables<"onboarding_profiles">,
  | "city_id"
  | "embedding"
  | "field_of_study_id"
  | "intended_field_of_study_id"
  | "onboarding_data"
  | "user_id"
  | "updated_at"
> & {
  additional_notes: Json;
  city: {
    id: number;
    name: string;
    state: {
      id: number;
      country_id: number;
      name: string;
    };
  } | null;
  extracurricular_activities: Array<{ id: number; name: string }> | null;
  field_of_study: { id: number; name: string } | null;
  graduation_year: Json;
  intended_field_of_study: { id: number; name: string } | null;
  last_attended_institution: Json;
};

export type OnboardingMatch = {
  matchResult: MatchResult | null;
  onboardingProfile: OnboardingProfile | null;
};

export async function fetchOnboardingMatch(): Promise<OnboardingMatch> {
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data: onboardingProfile, error: onboardingProfileError } =
      await supabase
        .from("onboarding_profiles")
        .select(
          `
        id,
        created_at,
        city:cities (
          id,
          name,
          state:states (
            id,
            country_id,
            name
          )
        ),
        date_of_birth,
        education_level,
        field_of_study:fields_of_study!field_of_study_id (
          id,
          name
        ),
        first_name,
        gender,
        intended_field_of_study:fields_of_study!intended_field_of_study_id (
          id,
          name
        ),
        last_name,
        match_results (
          id,
          match_feedback (
            match_relevance_rating
          ),
          match_scholarships (
            scholarship_id,
            scholarship:scholarships (
              id,
              content,
              name,
              url
            )
          )
        ),
        onboarding_data->additional_notes,
        onboarding_data->graduation_year,
        onboarding_data->last_attended_institution,
        status
        `,
        )
        .eq("user_id", user.id)
        .eq("status", "completed")
        .order("created_at", {
          ascending: false,
          referencedTable: "match_results",
        })
        .limit(1, { referencedTable: "match_results" })
        .maybeSingle();

    if (onboardingProfileError) {
      throw new Error(onboardingProfileError.message);
    }

    if (!onboardingProfile) {
      return {
        matchResult: null,
        onboardingProfile: null,
      };
    }

    const { data: extracurriculars, error: extracurricularsError } =
      await supabase
        .from("user_extracurricular_activities")
        .select(
          `
          extracurricular_activities (
            id,
            name
          )
          `,
        )
        .eq("user_id", user.id);

    if (extracurricularsError) {
      throw new Error(extracurricularsError.message);
    }

    const { match_results: matchResults, ...onboardingData } =
      onboardingProfile;

    return {
      matchResult: {
        ...matchResults[0],
        match_scholarships: matchResults[0].match_scholarships.map(
          (item) => item.scholarship,
        ),
      },
      onboardingProfile: {
        ...onboardingData,
        extracurricular_activities: extracurriculars.map((activity) => ({
          id: activity.extracurricular_activities.id,
          name: activity.extracurricular_activities.name,
        })),
      },
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch onboarding match results.");
  }
}

export type State = Pick<Tables<"states">, "id" | "name" | "country_id">;

export async function fetchStates(): Promise<State[]> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("states")
      .select("id, name, country_id");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch states list.");
  }
}
