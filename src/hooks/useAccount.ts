import { useSession } from "@/context/SessionContext";
import { useAccountList } from "@/queries/useAccountList";
import { useCreateAccount } from "@/queries/useCreateAccount";
import { useDeleteAccount } from "@/queries/useDeleteAccount";

export const useAccount = () => {
  const { userID } = useSession();
  //GET FETCH BANKS
  const {
    data: accountList,
    isLoading: isAccountListLoading,
    isError: isAccountListError,
    error: accountListError,
  } = useAccountList(userID);

  const isAccountlistEmpty = !(
    Array.isArray(accountList) && accountList.length > 0
  );

  //ADD NEW BANK
  const {
    mutate: addAccount,
    isPending: isAddAccountPending,
    isSuccess: isAddAccountSuccess,
  } = useCreateAccount(userID);

  //REMOVE BANK
  const { mutate: removeAccount } = useDeleteAccount(userID);

  return {
    accountList,
    isAccountListLoading,
    isAccountListError,
    accountListError,
    addAccount,
    isAddAccountPending,
    isAddAccountSuccess,
    isAccountlistEmpty,
    removeAccount,
  };
};
