import { type Database } from "./supabase.types";

export type BankTypes = Database["public"]["Tables"]["banks"]["Row"];
export type TransactionTypes =
  Database["public"]["Tables"]["transactions"]["Row"];
