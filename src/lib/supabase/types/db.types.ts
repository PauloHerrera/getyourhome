export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      amenity_categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          status: Database["public"]["Enums"]["status"];
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Relationships: [];
      };
      brokers: {
        Row: {
          created_at: string | null;
          id: string;
          license_number: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          license_number?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          license_number?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "brokers_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      property_ads: {
        Row: {
          acquisition_purpose: string | null;
          bathrooms: number | null;
          bedrooms: number | null;
          city: string | null;
          created_at: string | null;
          desired_amenities: Json | null;
          id: string;
          lead_id: string;
          mandatory_amenities: Json | null;
          max_area: number | null;
          max_budget: number;
          min_area: number | null;
          min_budget: number;
          neighborhood: string | null;
          observations: string | null;
          parking_spaces: number | null;
          property_type_id: string;
          status: Database["public"]["Enums"]["status"];
          transaction_type: Database["public"]["Enums"]["transaction_type"];
          uf: string | null;
          updated_at: string | null;
        };
        Insert: {
          acquisition_purpose?: string | null;
          bathrooms?: number | null;
          bedrooms?: number | null;
          city?: string | null;
          created_at?: string | null;
          desired_amenities?: Json | null;
          id?: string;
          lead_id: string;
          mandatory_amenities?: Json | null;
          max_area?: number | null;
          max_budget?: number;
          min_area?: number | null;
          min_budget?: number;
          neighborhood?: string | null;
          observations?: string | null;
          parking_spaces?: number | null;
          property_type_id: string;
          status?: Database["public"]["Enums"]["status"];
          transaction_type: Database["public"]["Enums"]["transaction_type"];
          uf?: string | null;
          updated_at?: string | null;
        };
        Update: {
          acquisition_purpose?: string | null;
          bathrooms?: number | null;
          bedrooms?: number | null;
          city?: string | null;
          created_at?: string | null;
          desired_amenities?: Json | null;
          id?: string;
          lead_id?: string;
          mandatory_amenities?: Json | null;
          max_area?: number | null;
          max_budget?: number;
          min_area?: number | null;
          min_budget?: number;
          neighborhood?: string | null;
          observations?: string | null;
          parking_spaces?: number | null;
          property_type_id?: string;
          status?: Database["public"]["Enums"]["status"];
          transaction_type?: Database["public"]["Enums"]["transaction_type"];
          uf?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "property_ads_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "property_ads_property_type_id_fkey";
            columns: ["property_type_id"];
            isOneToOne: false;
            referencedRelation: "property_types";
            referencedColumns: ["id"];
          },
        ];
      };
      property_amenities: {
        Row: {
          amenity_category_id: string;
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          status: Database["public"]["Enums"]["status"];
          updated_at: string | null;
        };
        Insert: {
          amenity_category_id: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Update: {
          amenity_category_id?: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "property_amenities_amenity_category_id_fkey";
            columns: ["amenity_category_id"];
            isOneToOne: false;
            referencedRelation: "amenity_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      property_types: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          status: Database["public"]["Enums"]["status"];
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          status?: Database["public"]["Enums"]["status"];
          updated_at?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
          last_name: string;
          metadata: Json;
          name: string;
          phone: string | null;
          role: Database["public"]["Enums"]["roles"];
          status: Database["public"]["Enums"]["status"];
          terms_accepted: boolean;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id: string;
          last_name: string;
          metadata?: Json;
          name: string;
          phone?: string | null;
          role: Database["public"]["Enums"]["roles"];
          status?: Database["public"]["Enums"]["status"];
          terms_accepted?: boolean;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
          last_name?: string;
          metadata?: Json;
          name?: string;
          phone?: string | null;
          role?: Database["public"]["Enums"]["roles"];
          status?: Database["public"]["Enums"]["status"];
          terms_accepted?: boolean;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      roles: "admin" | "broker" | "lead";
      status: "pending" | "active" | "inactive" | "deleted";
      transaction_type: "sale" | "rent" | "sale_rent";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      roles: ["admin", "broker", "lead"],
      status: ["pending", "active", "inactive", "deleted"],
      transaction_type: ["sale", "rent", "sale_rent"],
    },
  },
} as const;

// Schema: public
// Enums
export type Role = Database["public"]["Enums"]["roles"];

export type Status = Database["public"]["Enums"]["status"];

export type TransactionType = Database["public"]["Enums"]["transaction_type"];

// Tables
export type AmenityCategory = Database["public"]["Tables"]["amenity_categories"]["Row"];
export type InsertAmenityCategory = Database["public"]["Tables"]["amenity_categories"]["Insert"];
export type UpdateAmenityCategory = Database["public"]["Tables"]["amenity_categories"]["Update"];

export type Broker = Database["public"]["Tables"]["brokers"]["Row"];
export type InsertBroker = Database["public"]["Tables"]["brokers"]["Insert"];
export type UpdateBroker = Database["public"]["Tables"]["brokers"]["Update"];

export type PropertyAd = Database["public"]["Tables"]["property_ads"]["Row"];
export type InsertPropertyAd = Database["public"]["Tables"]["property_ads"]["Insert"];
export type UpdatePropertyAd = Database["public"]["Tables"]["property_ads"]["Update"];

export type PropertyAmenity = Database["public"]["Tables"]["property_amenities"]["Row"];
export type InsertPropertyAmenity = Database["public"]["Tables"]["property_amenities"]["Insert"];
export type UpdatePropertyAmenity = Database["public"]["Tables"]["property_amenities"]["Update"];

export type PropertyType = Database["public"]["Tables"]["property_types"]["Row"];
export type InsertPropertyType = Database["public"]["Tables"]["property_types"]["Insert"];
export type UpdatePropertyType = Database["public"]["Tables"]["property_types"]["Update"];

export type User = Database["public"]["Tables"]["users"]["Row"];
export type InsertUser = Database["public"]["Tables"]["users"]["Insert"];
export type UpdateUser = Database["public"]["Tables"]["users"]["Update"];
