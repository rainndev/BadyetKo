import supabase from "../supabase/supabase-client";
import {
  type TransactionInsertTypes,
  type TransactionListTypes,
} from "../types/transaction.types";

export const getTransactionList = async (
  bankID?: string,
): Promise<{ transactions: TransactionListTypes[]; balance?: number }> => {
  if (bankID === undefined) {
    //execute this when theres no bank_id
    const { data: transactions, error: txError } = await supabase
      .from("transactions")
      .select(`
      *,
      categories (
        name
      )
    `)
      .order("created_at", { ascending: false })
      .limit(10);

    if (txError) {
      console.error("Error:", txError);
      throw txError;
    }

    return {
      transactions,
    };
  }

  //execute this when bank_id exist
  const { data: transactions, error: txError } = await supabase
    .from("transactions")
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq("bank_id", bankID);

  const { data: bankData, error: bankError } = await supabase
    .from("banks")
    .select("balance")
    .eq("id", bankID)
    .single();

  if (txError || bankError) {
    console.error("Error:", txError || bankError);
    throw txError || bankError;
  }

  console.log("getting transaction list with bank_id", transactions);
  return {
    transactions,
    balance: bankData?.balance ?? 0,
  };
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
