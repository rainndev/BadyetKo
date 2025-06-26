import supabase from "@/supabase/supabase-client";
import type { UserTypes } from "@/types/user.types";

export const getNetBalance = async (): Promise<
  Pick<UserTypes, "net_balance">[]
> => {
  const { data, error } = await supabase.from("users").select("net_balance");
  if (error) throw error;
  return data;
};
