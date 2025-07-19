import type { Database } from "@/types/supabase.types";
import type { CategoriesListTypes } from "./categories.types";

export type TransactionListTypes =
  Database["public"]["Tables"]["transactions"]["Row"] & {
    categories?: CategoriesListTypes | null;
  };

export type TransactionInsertTypes =
  Database["public"]["Tables"]["transactions"]["Insert"];
