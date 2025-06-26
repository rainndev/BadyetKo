import supabase from "../supabase/supabase-client";
import {
  type TransactionInsertTypes,
  type TransactionListTypes,
} from "../types/transaction.types";

export const getTransactionList = async (
  bankID: string
): Promise<TransactionListTypes[]> => {
  const { data, error } = await supabase
    .from(`transactions`)
    .select("*")
    .eq("bank_id", bankID);

  if (error) {
    console.error("error", error);
    throw error;
  }

  return data;
};

export const createTransaction = async (
  input: TransactionInsertTypes
): Promise<TransactionListTypes[]> => {
  const { data, error } = await supabase
    .from("transactions")
    .insert([{ ...input }])
    .select()
    .single();

  if (error) {
    console.error("error", error);
    throw error;
  }

  console.log("Successful:", data);
  return data;
};
