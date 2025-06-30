import type { Database } from "@/types/supabase.types";

export type UserTypes = Database["public"]["Tables"]["users"]["Row"];
