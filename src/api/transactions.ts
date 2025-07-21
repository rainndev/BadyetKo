import supabase from "../supabase/supabase-client";
import {
  type TransactionInsertTypes,
  type TransactionListTypes,
} from "../types/transaction.types";

export const getTransactionList = async (
  accountID?: string,
): Promise<{ transactions: TransactionListTypes[]; count: number | null }> => {
  if (accountID === undefined) {
    //execute this when theres no account_id
    const {
      data: transactions,
      error: txError,
      count,
    } = await supabase
      .from("transactions")
      .select(
        `
      *,
      categories (
        name,
        color,
        icon_id
      )
    `,
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .limit(10);

    if (txError) {
      console.error("Error:", txError);
      throw txError;
    }

    return { transactions, count };
  }

  //execute this when account_id exist
  const {
    data: transactions,
    error: txError,
    count,
  } = await supabase
    .from("transactions")
    .select(
      `
      *,
      categories (
        name,
        color,
        icon_id
      )
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .eq("account_id", accountID);

  if (txError) {
    console.error("Error:", txError);
    throw txError;
  }

  return { transactions, count };
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
