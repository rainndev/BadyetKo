import { useCreateTransaction } from "@/queries/useCreateTransaction";
import { useDeleteTransaction } from "@/queries/useDeleteTransaction";
import { useEditTransaction } from "@/queries/useEditTransaction";
import { useTransactionList } from "@/queries/useTransactionList";

export const useBankTransactions = (bank_id: string) => {
  //hook for getting list of transactions
  const { data: transactionData, isLoading: isTransactionListLoading } =
    useTransactionList(bank_id);

  //hook for adding transaction
  const {
    mutate: addTransaction,
    isPending: isAddPending,
    isError: isAddError,
    error: AddError,
  } = useCreateTransaction(bank_id);

  //hook for deleting transaction
  const { mutate: deleteTransaction, isPending: isDeletePending } =
    useDeleteTransaction(bank_id);

  const {
    mutate: editTransaction,
    isPending: isEditPending,
    isSuccess: isEditSuccess,
  } = useEditTransaction(bank_id);
  return {
    isAddError,
    AddError,
    transactionData,
    isTransactionListLoading,
    addTransaction,
    isAddPending,
    deleteTransaction,
    isDeletePending,
    editTransaction,
    isEditPending,
    isEditSuccess,
  };
};
