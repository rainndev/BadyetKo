import supabase from "../supabase/supabase-client";

export const getBankList = async () => {
  const { data, error } = await supabase.from("banks").select("*");

  if (error) throw error;
  return data;
};
