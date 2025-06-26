import type { Database } from "./supabase.types";

export type UserTypes = Database["public"]["Tables"]["users"]["Row"];
