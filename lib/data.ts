import { createClient } from "@/utils/supabase/server";
import type { Tables } from "@/types/database";

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
