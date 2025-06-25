import supabase from "../supabase/supabase-client";
import { type BankListTypes } from "../types/bank.types";

export const getBankList = async (): Promise<BankListTypes[]> => {
  const { data, error } = await supabase.from(`banks`).select("*");
  if (error) throw error;
  return data;
};

export const createBank = async ({
  bankName,
  custom_bank_avatar,
}: {
  bankName: string;
  custom_bank_avatar?: string;
}): Promise<BankListTypes[]> => {
  const { data, error } = await supabase
    .from("banks")
    .insert([{ name: bankName, custom_bank_avatar }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeBank = async (bankID: string): Promise<BankListTypes[]> => {
  const { data, error } = await supabase
    .from("banks")
    .delete()
    .eq("id", bankID)
    .select()
    .single();

  if (error) throw error;
  return data;
};
