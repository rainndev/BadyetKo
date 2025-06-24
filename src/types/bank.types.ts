import { type Database } from "./supabase.types";

export type BankTypes = Database["public"]["Tables"]["banks"]["Row"];
