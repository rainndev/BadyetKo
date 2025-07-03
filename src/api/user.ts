import supabase from "@/supabase/supabase-client";
import type { UserTypes } from "@/types/user.types";

type updateCurrencyType = {
  user_id: string;
  newCurrency: string;
};

export const getUserStatistic = async (): Promise<
  Pick<UserTypes, "net_balance" | "total_deposit" | "total_withdraw">[]
> => {
  const { data, error } = await supabase
    .from("users")
    .select("net_balance, total_deposit, total_withdraw");

  if (error) throw error;
  return data;
};

export async function getUserCurrency(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("users")
    .select("currency")
    .eq("id", userId)
    .single();

  if (error || !data?.currency) {
    console.error("error", error?.message);
    throw error;
  }

  return data.currency;
}

export const updateUserCurrency = async ({
  user_id,
  newCurrency,
}: updateCurrencyType) => {
  const { data, error } = await supabase
    .from("users")
    .update({ currency: newCurrency })
    .eq("id", user_id);

  if (error) {
    console.error("Mutation currency error", error);
    throw error;
  }

  return data;
};
