import supabase from "@/supabase/supabase-client";
import type { UserTypes } from "@/types/user.types";

export const getUserStatistic = async (): Promise<
  Pick<UserTypes, "net_balance" | "total_deposit" | "total_withdraw">[]
> => {
  const { data, error } = await supabase
    .from("users")
    .select("net_balance, total_deposit, total_withdraw");

  console.log("net_balance execute");
  if (error) throw error;
  return data;
};
