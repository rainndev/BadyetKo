import supabase from "../supabase/supabase-client";
import {
  type TransactionInsertTypes,
  type TransactionListTypes,
} from "../types/transaction.types";

export const getTransactionList = async (
  bankID?: string,
): Promise< TransactionListTypes[] > => {
  if (bankID === undefined) {
    //execute this when theres no bank_id
    const { data: transactions, error: txError } = await supabase
      .from("transactions")
      .select(`
      *,
      categories (
        name,
        color
      )
    `)
      .order("created_at", { ascending: false })
      .limit(10);

    if (txError) {
      console.error("Error:", txError);
      throw txError;
    }

    return transactions;
  }

  //execute this when bank_id exist
  const { data: transactions, error: txError } = await supabase
    .from("transactions")
    .select(`
      *,
      categories (
        name,
        color
      )
    `)
    .order("created_at", { ascending: false })
    .eq("bank_id", bankID);

  if (txError ) {
    console.error("Error:", txError );
    throw txError;
  }
  
  console.log("getting transaction list with bank_id", transactions);
  return transactions;
};

export const createTransaction = async (
  input: TransactionInsertTypes,
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

export const removeTransaction = async (id: number) => {
  const { error } = await supabase.rpc(
    "delete_transaction_with_balance_adjustment",
    { t_id: id },
  );
  console.log("error", error);
  if (error) throw error;
};

type editTransactionProps = Pick<
  TransactionInsertTypes,
  "name" | "note" | "id" | "category"
>;

export const editTransaction = async (input: editTransactionProps) => {
  //update ===>>>  name, note

  const { data, error } = await supabase
    .from("transactions")
    .update({
      name: input.name,
      note: input.note,
      category: input.category,
    })
    .eq("id", input.id);

  if (error) {
    console.error("Update error", error);
    throw error;
  }

  return data;
};
