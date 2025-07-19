import supabase from "@/supabase/supabase-client";
import type { UserTypes } from "@/types/user.types";

type updateCurrencyType = {
  user_id: string;
  newCurrency: string;
};

export const getUserStatistics = async (): Promise<{
  userData: Pick<
    UserTypes,
    "net_balance" | "total_deposit" | "total_withdraw"
  >[];
}> => {
  const { data: userData, error: userDataError } = await supabase
    .from("users")
    .select("net_balance, total_deposit, total_withdraw");

  if (userDataError) throw userDataError;

  return {
    userData,
  };
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

type ChartPieDonutData = {
  category_name: string;
  net_balance: number;
  color: string;
};

export const getCategoryPieData = async (): Promise<ChartPieDonutData[]> => {
  const { data, error } = await supabase.rpc("get_category_net_balances");

  if (error) {
    console.error("getCategoryNetData error", error);
    throw error;
  }
  return data;
};
