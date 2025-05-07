export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: {
          code: string
          created_at: string | null
          default_locale: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          default_locale: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          default_locale?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      locales: {
        Row: {
          code: string
          country_id: string
          id: string
          is_default: boolean
        }
        Insert: {
          code: string
          country_id: string
          id?: string
          is_default?: boolean
        }
        Update: {
          code?: string
          country_id?: string
          id?: string
          is_default?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "locales_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      page_content: {
        Row: {
          content: Json
          country_id: string
          id: string
          page_id: string
          publish_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          content: Json
          country_id: string
          id?: string
          page_id: string
          publish_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json
          country_id?: string
          id?: string
          page_id?: string
          publish_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_content_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_content_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_sections: {
        Row: {
          content: Json
          country_id: string
          id: string
          order: number
          page_id: string
          publish_at: string | null
          section_key: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          content: Json
          country_id: string
          id?: string
          order?: number
          page_id: string
          publish_at?: string | null
          section_key: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json
          country_id?: string
          id?: string
          order?: number
          page_id?: string
          publish_at?: string | null
          section_key?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string | null
          id: string
          is_index: boolean
          route_pattern: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_index?: boolean
          route_pattern?: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_index?: boolean
          route_pattern?: string
          slug?: string
        }
        Relationships: []
      }
      policies: {
        Row: {
          content: Json
          country_id: string
          created_at: string | null
          id: string
          is_active: boolean
          type_id: number
        }
        Insert: {
          content: Json
          country_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          type_id: number
        }
        Update: {
          content?: Json
          country_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "policies_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "policy_types"
            referencedColumns: ["id"]
          },
        ]
      }
      policy_types: {
        Row: {
          code: string
          id: number
          label: string
        }
        Insert: {
          code: string
          id?: number
          label: string
        }
        Update: {
          code?: string
          id?: number
          label?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          country_code: string
          country_id: string
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_active: boolean
          locale_id: string | null
          name: string
          order: number
        }
        Insert: {
          country_code?: string
          country_id: string
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean
          locale_id?: string | null
          name: string
          order?: number
        }
        Update: {
          country_code?: string
          country_id?: string
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_active?: boolean
          locale_id?: string | null
          name?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "services_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_locale_id_fkey"
            columns: ["locale_id"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonial_pages: {
        Row: {
          page_id: string
          testimonial_id: string
        }
        Insert: {
          page_id: string
          testimonial_id: string
        }
        Update: {
          page_id?: string
          testimonial_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonial_pages_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonial_pages_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          author_image_url: string | null
          author_name: string
          content: string
          country_id: string
          created_at: string | null
          id: string
          is_active: boolean
          locale_id: string | null
          rating: number | null
        }
        Insert: {
          author_image_url?: string | null
          author_name: string
          content: string
          country_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          locale_id?: string | null
          rating?: number | null
        }
        Update: {
          author_image_url?: string | null
          author_name?: string
          content?: string
          country_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          locale_id?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_locale_id_fkey"
            columns: ["locale_id"]
            isOneToOne: false
            referencedRelation: "locales"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fallback_country_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_page_content: {
        Args: { p_country_code: string; p_slug: string }
        Returns: Json
      }
      has_scope: {
        Args: { required: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
