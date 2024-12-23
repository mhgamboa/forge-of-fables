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
      encounter_monsters: {
        Row: {
          created_at: string
          encounter_id: number
          id: number
          monster_id: number
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          encounter_id: number
          id?: number
          monster_id: number
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          encounter_id?: number
          id?: number
          monster_id?: number
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "encounter_monsters_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "encounter_monsters_monster_id_fkey"
            columns: ["monster_id"]
            isOneToOne: false
            referencedRelation: "monsters"
            referencedColumns: ["id"]
          },
        ]
      }
      encounter_players: {
        Row: {
          created_at: string
          encounter_id: number | null
          id: number
          name: string | null
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          encounter_id?: number | null
          id?: number
          name?: string | null
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          encounter_id?: number | null
          id?: number
          name?: string | null
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "encounter_players_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
        ]
      }
      encounters: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      monsters: {
        Row: {
          ac_notes: string | null
          ac_value: number
          actions: Json
          cha: number
          challenge: string | null
          con: number
          condition_immunities: string[]
          damage_immunities: string[]
          damage_resistances: string[]
          damage_vulnerabilities: string[]
          description: string | null
          dex: number
          hp_notes: string | null
          hp_value: number
          id: number
          int: number
          is_deleted: boolean
          languages: string[]
          name: string
          raw_text: string | null
          saves: Json[] | null
          senses: string[]
          skills: Json
          source: string
          speed: string[]
          str: number
          tags: string[]
          traits: Json | null
          type: string
          user_id: string | null
          wis: number
        }
        Insert: {
          ac_notes?: string | null
          ac_value: number
          actions: Json
          cha?: number
          challenge?: string | null
          con?: number
          condition_immunities: string[]
          damage_immunities: string[]
          damage_resistances: string[]
          damage_vulnerabilities: string[]
          description?: string | null
          dex?: number
          hp_notes?: string | null
          hp_value: number
          id?: number
          int?: number
          is_deleted?: boolean
          languages: string[]
          name: string
          raw_text?: string | null
          saves?: Json[] | null
          senses: string[]
          skills: Json
          source: string
          speed: string[]
          str?: number
          tags: string[]
          traits?: Json | null
          type: string
          user_id?: string | null
          wis?: number
        }
        Update: {
          ac_notes?: string | null
          ac_value?: number
          actions?: Json
          cha?: number
          challenge?: string | null
          con?: number
          condition_immunities?: string[]
          damage_immunities?: string[]
          damage_resistances?: string[]
          damage_vulnerabilities?: string[]
          description?: string | null
          dex?: number
          hp_notes?: string | null
          hp_value?: number
          id?: number
          int?: number
          is_deleted?: boolean
          languages?: string[]
          name?: string
          raw_text?: string | null
          saves?: Json[] | null
          senses?: string[]
          skills?: Json
          source?: string
          speed?: string[]
          str?: number
          tags?: string[]
          traits?: Json | null
          type?: string
          user_id?: string | null
          wis?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
