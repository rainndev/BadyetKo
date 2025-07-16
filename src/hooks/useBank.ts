import { useSession } from "@/context/SessionContext";
import { useBankList } from "@/queries/useBankList";
import { useCreateBank } from "@/queries/useCreateBank";
import { useDeleteBank } from "@/queries/useDeleteBank";

export const useBank = () => {

  const {userID} = useSession()
  //GET FETCH BANKS
  const {
    data: bankList,
    isLoading: isBankListLoading,
    isError: isBankListError,
    error: bankListError,
  } = useBankList(userID);

  const isBanklistEmpty = !(Array.isArray(bankList) && bankList.length > 0);

  //ADD NEW BANK
  const {
    mutate: addBank,
    isPending: isAddBankPending,
    isSuccess: isAddBankSuccess,
  } = useCreateBank(userID);

  //REMOVE BANK
  const { mutate: removeBank } = useDeleteBank(userID);

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
