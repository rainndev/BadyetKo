import { type Database } from "@/types/supabase.types";

export type AccountListTypes = Database["public"]["Tables"]["accounts"]["Row"];
export type AccountInsertTypes =
  Database["public"]["Tables"]["accounts"]["Insert"];
