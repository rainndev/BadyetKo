import { useSession } from "@/context/SessionContext";
import { useCreateTransaction } from "@/queries/useCreateTransaction";
import { useDeleteTransaction } from "@/queries/useDeleteTransaction";
import { useEditTransaction } from "@/queries/useEditTransaction";
import { useTransactionList } from "@/queries/useTransactionList";

export const useBankTransactions = (bank_id: string) => {
  const {userID} = useSession()
  //hook for getting list of transactions
  const { data: transactionData, isLoading: isTransactionListLoading } =
    useTransactionList(bank_id);

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

  const {
    mutate: editTransaction,
    isPending: isEditPending,
    isSuccess: isEditSuccess,
  } = useEditTransaction();


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
    isAddSuccess,
    isEditSuccess,
  };
};
