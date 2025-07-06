import { useBankList } from "@/queries/useBankList";
import { useCreateBank } from "@/queries/useCreateBank";
import { useDeleteBank } from "@/queries/useDeleteBank";

export const useBank = (user_id: string) => {
  //GET FETCH BANKS
  const {
    data: bankList,
    isLoading: isBankListLoading,
    isError: isBankListError,
    error: bankListError,
  } = useBankList(user_id);

  const isBanklistEmpty = !(Array.isArray(bankList) && bankList.length > 0);

  //ADD NEW BANK
  const {
    mutate: addBank,
    isPending: isAddBankPending,
    isSuccess: isAddBankSuccess,
  } = useCreateBank(user_id);

  //REMOVE BANK
  const { mutate: removeBank } = useDeleteBank(user_id);

  return {
    bankList,
    isBankListLoading,
    isBankListError,
    bankListError,
    addBank,
    isAddBankPending,
    isAddBankSuccess,
    isBanklistEmpty,
    removeBank,
  };
};
