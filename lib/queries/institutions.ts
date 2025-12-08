import { createClient } from "@/utils/supabase/server";

export type Institution = {
  id: number;
  name: string;
};

/**
 * Fetch all institutions
 */
export async function getInstitutions(): Promise<Institution[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("institutions")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching institutions:", error);
    return [];
  }

  return data || [];
}
