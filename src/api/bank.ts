import supabase from "../supabase/supabase-client";

export const getBankList = async () => {
  const { data, error } = await supabase.from(`banks`).select("*");

  if (error) throw error;
  return data;
};

export const createBank = async (bankName: string) => {
  const { data, error } = await supabase
    .from("banks")
    .insert([{ name: bankName }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeBank = async (bankID: string) => {
  const { data, error } = await supabase
    .from("banks")
    .delete()
    .eq("id", bankID)
    .select()
    .single();

  if (error) throw error;
  return data;
};
