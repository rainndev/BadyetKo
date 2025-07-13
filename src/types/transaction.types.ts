import type { Database } from "@/types/supabase.types";

export type TransactionListTypes =
  Database["public"]["Tables"]["transactions"]["Row"] & {
     categories?: {
    name: string;
  } | null;
  };

export type TransactionInsertTypes =
  Database["public"]["Tables"]["transactions"]["Insert"];
