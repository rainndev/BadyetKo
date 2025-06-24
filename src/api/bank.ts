import supabase from "../supabase/supabase-client";
import { type BankInsertTypes, type BankListTypes } from "../types/bank.types";

export const getBankList = async (): Promise<BankListTypes[]> => {
  const { data, error } = await supabase.from(`banks`).select("*");
  if (error) throw error;
  return data;
};

export const createBank = async (
  bankName: BankInsertTypes
): Promise<BankListTypes[]> => {
  const { data, error } = await supabase
    .from("banks")
    .insert([{ name: bankName }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeBank = async (
  bankID: BankInsertTypes
): Promise<BankListTypes[]> => {
  const { data, error } = await supabase
    .from("banks")
    .delete()
    .eq("id", bankID)
    .select()
    .single();

  if (error) throw error;
  return data;
};
