import type { Database } from "./supabase.types";

export type TransactionListTypes =
  Database["public"]["Tables"]["transactions"]["Row"];

export type TransactionInsertTypes =
  Database["public"]["Tables"]["transactions"]["Insert"];
