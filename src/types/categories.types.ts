import type { Database } from "@/types/supabase.types";

export type CategoriesListTypes =
  Database["public"]["Tables"]["categories"]["Row"];

export type CategoriesInsertTypes =
  Database["public"]["Tables"]["categories"]["Insert"];
