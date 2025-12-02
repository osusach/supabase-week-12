export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      cities: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          state_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          state_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          state_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cities_state_id_fkey";
            columns: ["state_id"];
            isOneToOne: false;
            referencedRelation: "states";
            referencedColumns: ["id"];
          },
        ];
      };
      countries: {
        Row: {
          continent: Database["public"]["Enums"]["continents"] | null;
          id: number;
          iso2: string;
          iso3: string | null;
          local_name: string | null;
          name: string | null;
        };
        Insert: {
          continent?: Database["public"]["Enums"]["continents"] | null;
          id?: number;
          iso2: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
        Update: {
          continent?: Database["public"]["Enums"]["continents"] | null;
          id?: number;
          iso2?: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          content: string;
          embedding: string;
          id: number;
          metadata: Json;
        };
        Insert: {
          content: string;
          embedding: string;
          id?: number;
          metadata?: Json;
        };
        Update: {
          content?: string;
          embedding?: string;
          id?: number;
          metadata?: Json;
        };
        Relationships: [];
      };
      extracurricular_activities: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      fields_of_study: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      institutions: {
        Row: {
          abbreviation: string | null;
          address: string | null;
          city_id: number;
          created_at: string;
          funding_type: Database["public"]["Enums"]["institution_funding_type"];
          id: number;
          image_url: string | null;
          institution_category: Database["public"]["Enums"]["institution_category"];
          name: string;
          updated_at: string | null;
          website_url: string | null;
        };
        Insert: {
          abbreviation?: string | null;
          address?: string | null;
          city_id: number;
          created_at?: string;
          funding_type: Database["public"]["Enums"]["institution_funding_type"];
          id?: number;
          image_url?: string | null;
          institution_category: Database["public"]["Enums"]["institution_category"];
          name: string;
          updated_at?: string | null;
          website_url?: string | null;
        };
        Update: {
          abbreviation?: string | null;
          address?: string | null;
          city_id?: number;
          created_at?: string;
          funding_type?: Database["public"]["Enums"]["institution_funding_type"];
          id?: number;
          image_url?: string | null;
          institution_category?: Database["public"]["Enums"]["institution_category"];
          name?: string;
          updated_at?: string | null;
          website_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "institutions_cities_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "cities";
            referencedColumns: ["id"];
          },
        ];
      };
      match_feedback: {
        Row: {
          contact_permission: boolean;
          created_at: string;
          id: number;
          improvement_notes: string | null;
          match_relevance_rating: number;
          match_result_id: number;
          updated_at: string | null;
        };
        Insert: {
          contact_permission: boolean;
          created_at?: string;
          id?: number;
          improvement_notes?: string | null;
          match_relevance_rating: number;
          match_result_id: number;
          updated_at?: string | null;
        };
        Update: {
          contact_permission?: boolean;
          created_at?: string;
          id?: number;
          improvement_notes?: string | null;
          match_relevance_rating?: number;
          match_result_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "match_feedback_match_result_id_fkey";
            columns: ["match_result_id"];
            isOneToOne: false;
            referencedRelation: "match_results";
            referencedColumns: ["id"];
          },
        ];
      };
      match_results: {
        Row: {
          created_at: string;
          id: number;
          onboarding_profile_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          onboarding_profile_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          onboarding_profile_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "match_results_onboarding_profile_id_fkey";
            columns: ["onboarding_profile_id"];
            isOneToOne: false;
            referencedRelation: "onboarding_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      match_scholarships: {
        Row: {
          created_at: string;
          id: number;
          match_result_id: number;
          scholarship_id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          match_result_id: number;
          scholarship_id: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          match_result_id?: number;
          scholarship_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "match_scholarships_match_result_id_fkey";
            columns: ["match_result_id"];
            isOneToOne: false;
            referencedRelation: "match_results";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "match_scholarships_scholarship_id_fkey";
            columns: ["scholarship_id"];
            isOneToOne: false;
            referencedRelation: "scholarships";
            referencedColumns: ["id"];
          },
        ];
      };
      onboarding_profiles: {
        Row: {
          city_id: number | null;
          created_at: string;
          date_of_birth: string | null;
          education_level:
            | Database["public"]["Enums"]["education_level_type"]
            | null;
          embedding: string | null;
          field_of_study_id: number | null;
          first_name: string | null;
          gender: Database["public"]["Enums"]["gender_type"] | null;
          id: number;
          intended_field_of_study_id: number | null;
          last_name: string | null;
          onboarding_data: Json;
          status: Database["public"]["Enums"]["onboarding_status_type"];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          city_id?: number | null;
          created_at?: string;
          date_of_birth?: string | null;
          education_level?:
            | Database["public"]["Enums"]["education_level_type"]
            | null;
          embedding?: string | null;
          field_of_study_id?: number | null;
          first_name?: string | null;
          gender?: Database["public"]["Enums"]["gender_type"] | null;
          id?: number;
          intended_field_of_study_id?: number | null;
          last_name?: string | null;
          onboarding_data?: Json;
          status?: Database["public"]["Enums"]["onboarding_status_type"];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          city_id?: number | null;
          created_at?: string;
          date_of_birth?: string | null;
          education_level?:
            | Database["public"]["Enums"]["education_level_type"]
            | null;
          embedding?: string | null;
          field_of_study_id?: number | null;
          first_name?: string | null;
          gender?: Database["public"]["Enums"]["gender_type"] | null;
          id?: number;
          intended_field_of_study_id?: number | null;
          last_name?: string | null;
          onboarding_data?: Json;
          status?: Database["public"]["Enums"]["onboarding_status_type"];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "onboarding_profiles_city_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "cities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "onboarding_profiles_field_of_study_id_fkey";
            columns: ["field_of_study_id"];
            isOneToOne: false;
            referencedRelation: "fields_of_study";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "onboarding_profiles_intended_field_of_study_id_fkey";
            columns: ["intended_field_of_study_id"];
            isOneToOne: false;
            referencedRelation: "fields_of_study";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "onboarding_profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          updated_at: string | null;
          username: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string;
        };
        Relationships: [];
      };
      scholarships: {
        Row: {
          benefit_types: Database["public"]["Enums"]["benefit_type"][];
          created_at: string;
          id: number;
          institution_id: number;
          name: string;
          overview: string;
          updated_at: string | null;
          url: string;
        };
        Insert: {
          benefit_types?: Database["public"]["Enums"]["benefit_type"][];
          created_at?: string;
          id?: number;
          institution_id: number;
          name: string;
          overview: string;
          updated_at?: string | null;
          url: string;
        };
        Update: {
          benefit_types?: Database["public"]["Enums"]["benefit_type"][];
          created_at?: string;
          id?: number;
          institution_id?: number;
          name?: string;
          overview?: string;
          updated_at?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scholarships_institution_id_fkey";
            columns: ["institution_id"];
            isOneToOne: false;
            referencedRelation: "institutions";
            referencedColumns: ["id"];
          },
        ];
      };
      states: {
        Row: {
          abbreviation: string | null;
          country_id: number;
          created_at: string;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          abbreviation?: string | null;
          country_id: number;
          created_at?: string;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          abbreviation?: string | null;
          country_id?: number;
          created_at?: string;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "states_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
        ];
      };
      user_extracurricular_activities: {
        Row: {
          activity_id: number;
          user_id: string;
        };
        Insert: {
          activity_id: number;
          user_id: string;
        };
        Update: {
          activity_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_extracurricular_activities_activity_id_fkey";
            columns: ["activity_id"];
            isOneToOne: false;
            referencedRelation: "extracurricular_activities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_extracurricular_activities_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_username: { Args: never; Returns: string };
      match_documents: {
        Args: { filter?: Json; match_count?: number; query_embedding: string };
        Returns: {
          content: string;
          embedding: Json;
          id: number;
          metadata: Json;
          similarity: number;
        }[];
      };
      match_scholarships: {
        Args: {
          match_count: number;
          match_threshold: number;
          profile_embedding: string;
        };
        Returns: {
          content: string;
          id: number;
          name: string;
          url: string;
        }[];
      };
    };
    Enums: {
      benefit_type: "tuition" | "housing" | "maintenance" | "other";
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America";
      education_level_type: "high_school" | "undergraduate" | "other";
      gender_type: "male" | "female" | "non_binary" | "prefer_not_to_say";
      institution_category: "university" | "ngo" | "government" | "other";
      institution_funding_type: "public" | "private" | "mixed" | "other";
      onboarding_status_type: "not_started" | "in_progress" | "completed";
      scholarship_category: "complementary" | "tuition" | "other";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      benefit_type: ["tuition", "housing", "maintenance", "other"],
      continents: [
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "Oceania",
        "North America",
        "South America",
      ],
      education_level_type: ["high_school", "undergraduate", "other"],
      gender_type: ["male", "female", "non_binary", "prefer_not_to_say"],
      institution_category: ["university", "ngo", "government", "other"],
      institution_funding_type: ["public", "private", "mixed", "other"],
      onboarding_status_type: ["not_started", "in_progress", "completed"],
      scholarship_category: ["complementary", "tuition", "other"],
    },
  },
} as const;
