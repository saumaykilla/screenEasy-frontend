export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          custom_sections: Json | null
          education: Json | null
          id: string
          personal_details: Json
          role_details: Json | null
          section_order: Json
          skills: Json | null
          template: Database["public"]["Enums"]["template_type"]
          updated_at: string | null
          user_id: string
          work_experience: Json | null
        }
        Insert: {
          created_at?: string | null
          custom_sections?: Json | null
          education?: Json | null
          id?: string
          personal_details?: Json
          role_details?: Json | null
          section_order?: Json
          skills?: Json | null
          template?: Database["public"]["Enums"]["template_type"]
          updated_at?: string | null
          user_id: string
          work_experience?: Json | null
        }
        Update: {
          created_at?: string | null
          custom_sections?: Json | null
          education?: Json | null
          id?: string
          personal_details?: Json
          role_details?: Json | null
          section_order?: Json
          skills?: Json | null
          template?: Database["public"]["Enums"]["template_type"]
          updated_at?: string | null
          user_id?: string
          work_experience?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      profile_view: {
        Row: {
          city: string | null
          contact_number: string | null
          country: string | null
          created_at: string | null
          education_field_name: string | null
          email: string | null
          full_name: string | null
          id: string | null
          linkedin_url: string | null
          skills_data: string | null
          summary: string | null
          template: Database["public"]["Enums"]["template_type"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          city?: never
          contact_number?: never
          country?: never
          created_at?: string | null
          education_field_name?: never
          email?: never
          full_name?: never
          id?: string | null
          linkedin_url?: never
          skills_data?: never
          summary?: never
          template?: Database["public"]["Enums"]["template_type"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          city?: never
          contact_number?: never
          country?: never
          created_at?: string | null
          education_field_name?: never
          email?: never
          full_name?: never
          id?: string | null
          linkedin_url?: never
          skills_data?: never
          summary?: never
          template?: Database["public"]["Enums"]["template_type"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      validate_profile_structure: {
        Args: { profile_data: Json }
        Returns: boolean
      }
    }
    Enums: {
      section_type:
        | "Skills"
        | "PersonalDetails"
        | "RoleDetails"
        | "EducationDetails"
        | "WorkExperience"
        | "CustomSection"
      template_type: "Classic" | "Modern"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      section_type: [
        "Skills",
        "PersonalDetails",
        "RoleDetails",
        "EducationDetails",
        "WorkExperience",
        "CustomSection",
      ],
      template_type: ["Classic", "Modern"],
    },
  },
} as const