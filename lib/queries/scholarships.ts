import { createClient } from "@/utils/supabase/server";

export type Scholarship = {
  id: number;
  name: string;
  overview: string;
  benefit_types: string[];
  url: string;
  institution: {
    id: number;
    name: string;
    image_url: string | null;
  };
};

/**
 * Fetch scholarships with optional filters and pagination
 * @param filters - Optional filters for institutions and benefits
 * @param page - Page number (1-based, default: 1)
 * @param pageSize - Number of items per page (default: 12)
 */
export async function getScholarships(
  filters?: {
    institutions?: string[];
    benefits?: string[];
  },
  page: number = 1,
  pageSize: number = 12,
) {
  const supabase = await createClient();

  try {
    // Convert 1-based page to 0-based range
    const from = (page - 1) * pageSize;
    const to = page * pageSize - 1;

    let query = supabase
      .from("scholarships")
      .select(
        `
        id,
        name,
        overview,
        benefit_types,
        url,
        institution:institutions (
          id,
          name,
          image_url
        )
      `,
        { count: "exact" },
      )
      .order("name", { ascending: true })
      .range(from, to);

    // Filter by institutions if provided
    if (filters?.institutions && filters.institutions.length > 0) {
      const institutionIds = filters.institutions
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id));

      if (institutionIds.length > 0) {
        query = query.in("institution_id", institutionIds);
      }
    }

    // Filter by benefit types if provided
    if (filters?.benefits && filters.benefits.length > 0) {
      query = query.overlaps("benefit_types", filters.benefits);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database error:", error.message);
      throw new Error("Error fetching scholarships.");
    }

    return {
      data: data,
      success: true,
      total: count ?? 0,
    };
  } catch (error) {
    console.error(
      "Server error:",
      error instanceof Error ? error.message : error,
    );
    return {
      data: [],
      message: "An unexpected error occurred. Please try again later",
      success: false,
      total: 0,
    };
  }
}
