import { useQuery } from "@tanstack/react-query";
import { getTransactionList } from "../api/transactions";

export const useTransactionList = (bankID?: string) => {
  return useQuery({
    queryKey: ["transaction", bankID],
    queryFn: () => getTransactionList(bankID),
    staleTime: bankID ? 1000 * 60 * 5 : 0,
    refetchOnWindowFocus: false,
  });
};
