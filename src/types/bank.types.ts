import { type Database } from "./supabase.types";

export type BankListTypes = Database["public"]["Tables"]["banks"]["Row"];
export type BankInsertTypes = Database["public"]["Tables"]["banks"]["Insert"];
