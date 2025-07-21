import { useSession } from "@/context/SessionContext";
import { useAccountNetBalance } from "@/queries/useAccountNetBalance";
import { useCreateTransaction } from "@/queries/useCreateTransaction";
import { useDeleteTransaction } from "@/queries/useDeleteTransaction";
import { useEditTransaction } from "@/queries/useEditTransaction";
import { useTransactionList } from "@/queries/useTransactionList";

export const useAccountTransactions = (account_id: string) => {
  const { userID } = useSession();
  //hook for getting list of transactions
  const {
    data: transactionData,
    isLoading: isTransactionListLoading,
    isError: isTransactionListError,
  } = useTransactionList(account_id);

  //get the account balance using account id
  const {
    data: accountBalance,
    isError: isAccountBalanceError,
    error: accountBalanceError,
    isLoading: isAccountBalanceLoading,
  } = useAccountNetBalance(account_id);

  //hook for adding transaction
  const {
    mutate: addTransaction,
    isPending: isAddPending,
    isError: isAddError,
    isSuccess: isAddSuccess,
    error: AddError,
  } = useCreateTransaction();

  //hook for deleting transaction
  const { mutate: deleteTransaction, isPending: isDeletePending } =
    useDeleteTransaction(account_id, userID);

  //hook for editing transaction
  const {
    mutate: editTransaction,
    isPending: isEditPending,
    isSuccess: isEditSuccess,
  } = useEditTransaction();

  return {
    AddError,
    accountBalanceError,
    transactionData,
    accountBalance,
    addTransaction,
    deleteTransaction,
    editTransaction,
    isAddError,
    isTransactionListLoading,
    isAddPending,
    isDeletePending,
    isEditPending,
    isAddSuccess,
    isEditSuccess,
    isAccountBalanceError,
    isTransactionListError,
    isAccountBalanceLoading,
  };
};
