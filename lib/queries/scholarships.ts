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
    benefits?: string[];
    institutions?: string[];
    search?: string;
    studyLevels?: string[];
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

    // Filter by study levels if provided
    if (filters?.studyLevels && filters.studyLevels.length > 0) {
      query = query.overlaps("study_levels", filters.studyLevels);
    }

    // Filter by search text if provided
    if (filters?.search && filters.search.trim().length > 0) {
      const searchTerm = `%${filters.search.trim()}%`;
      query = query.or(`name.ilike.${searchTerm},overview.ilike.${searchTerm}`);
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

/**
 * Get scholarship counts grouped by benefit type
 * @returns Record mapping benefit type to scholarship count
 */
export async function getScholarshipCountsByBenefit(): Promise<
  Record<string, number>
> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("scholarships")
      .select("benefit_types");

    if (error) {
      console.error("Database error:", error.message);
      throw new Error("Error fetching scholarship benefit counts.");
    }

    // Initialize counts for all benefit types
    const counts: Record<string, number> = {
      tuition: 0,
      housing: 0,
      maintenance: 0,
      other: 0,
    };

    // Count each benefit type occurrence
    data?.forEach((scholarship) => {
      scholarship.benefit_types.forEach((type) => {
        if (type in counts) {
          counts[type] = counts[type] + 1;
        }
      });
    });

    return counts;
  } catch (error) {
    console.error(
      "Server error:",
      error instanceof Error ? error.message : error,
    );
    return {};
  }
}

/**
 * Get scholarship counts grouped by institution
 * @returns Record mapping institution ID to scholarship count
 */
export async function getScholarshipCountsByInstitution(): Promise<
  Record<number, number>
> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("scholarships")
      .select("institution_id");

    if (error) {
      console.error("Database error:", error.message);
      throw new Error("Error fetching scholarship counts by institution.");
    }

    // Aggregate counts by institution_id
    const counts = data?.reduce(
      (acc, scholarship) => {
        const id = scholarship.institution_id;
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    return counts || {};
  } catch (error) {
    console.error(
      "Server error:",
      error instanceof Error ? error.message : error,
    );
    return {};
  }
}

/**
 * Get scholarship counts grouped by study level
 * @returns Record mapping study level to scholarship count
 */
export async function getScholarshipCountsByStudyLevel(): Promise<
  Record<string, number>
> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("scholarships")
      .select("study_levels");

    if (error) {
      console.error("Database error:", error.message);
      throw new Error("Error fetching scholarship study level counts.");
    }

    // Initialize counts for all study levels
    const counts: Record<string, number> = {
      undergraduate: 0,
      graduate: 0,
    };

    // Count each study level occurrence
    data?.forEach((scholarship) => {
      scholarship.study_levels.forEach((level) => {
        if (level in counts) {
          counts[level] = counts[level] + 1;
        }
      });
    });

    return counts;
  } catch (error) {
    console.error(
      "Server error:",
      error instanceof Error ? error.message : error,
    );
    return {};
  }
}
