import { useCreateTransaction } from "@/queries/useCreateTransaction";
import { useDeleteTransaction } from "@/queries/useDeleteTransaction";
import { useTransactionList } from "@/queries/useTransactionList";

export const useBankTransactions = (bank_id: string) => {
  //hook for getting list of transactions
  const { data: transactionList, isLoading: isTransactionListLoading } =
    useTransactionList(bank_id);

  //hook for adding transaction
  const { mutate: addTransaction, isPending: isAddPending } =
    useCreateTransaction(bank_id);

  //hook for deleting transaction
  const { mutate: deleteTransaction, isPending: isDeletePending } =
    useDeleteTransaction(bank_id);

  return {
    transactionList,
    isTransactionListLoading,
    addTransaction,
    isAddPending,
    deleteTransaction,
    isDeletePending,
  };
};
