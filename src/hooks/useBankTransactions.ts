import { useSession } from "@/context/SessionContext";
import { useBankNetBalance } from "@/queries/useBankNetBalance";
import { useCreateTransaction } from "@/queries/useCreateTransaction";
import { useDeleteTransaction } from "@/queries/useDeleteTransaction";
import { useEditTransaction } from "@/queries/useEditTransaction";
import { useTransactionList } from "@/queries/useTransactionList";

export const useBankTransactions = (bank_id: string) => {
  const { userID } = useSession();
  //hook for getting list of transactions
  const {
    data: transactionData,
    isLoading: isTransactionListLoading,
    isError: isTransactionListError,
  } = useTransactionList(bank_id);

  //get the bank balance using bank id
  const {
    data: bankBalance,
    isError: isBankBalanceError,
    error: bankBalanceError,
    isLoading: isBankBalanceLoading,
  } = useBankNetBalance(bank_id);

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
    useDeleteTransaction(bank_id, userID);

  //hook for editing transaction
  const {
    mutate: editTransaction,
    isPending: isEditPending,
    isSuccess: isEditSuccess,
  } = useEditTransaction();

  return {
    AddError,
    bankBalanceError,
    transactionData,
    bankBalance,
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
    isBankBalanceError,
    isTransactionListError,
    isBankBalanceLoading,
  };
};
