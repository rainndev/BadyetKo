import supabase from "../supabase/supabase-client";
import { type AccountListTypes } from "../types/account.types";

export const getAccountList = async (): Promise<AccountListTypes[]> => {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createAccount = async ({
  accountName,
  custom_account_avatar,
}: {
  accountName: string;
  custom_account_avatar?: string;
}): Promise<AccountListTypes[]> => {
  const { data, error } = await supabase
    .from("accounts")
    .insert([{ name: accountName, custom_account_avatar }])
    .select()
    .single();

  if (error) {
    console.error("error adding account", error);
    throw error;
  }

  return data;
};

export const removeAccount = async ({
  accountID,
  avatarFilePath,
}: {
  accountID: string;
  avatarFilePath: string;
}): Promise<AccountListTypes[]> => {
  const { data, error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", accountID)
    .select()
    .single();

  const { error: deletingAvatarError } = await supabase.storage
    .from("bank-avatar")
    .remove([avatarFilePath]);

  if (error || deletingAvatarError) {
    console.error(
      "deleting account and avatar error",
      error?.message,
      deletingAvatarError?.message,
    );
    throw error;
  }
  return data;
};

export const getAccountBalance = async (accountID: string) => {
  const { data, error } = await supabase
    .from("accounts")
    .select("balance")
    .eq("id", accountID)
    .single();

  if (error) {
    console.error("balance error", error);
    throw error;
  }
  return data;
};
