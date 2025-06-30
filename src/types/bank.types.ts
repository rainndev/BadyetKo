import { type Database } from "@/types/supabase.types";

export type BankListTypes = Database["public"]["Tables"]["banks"]["Row"];
export type BankInsertTypes = Database["public"]["Tables"]["banks"]["Insert"];
