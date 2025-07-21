import { useQuery } from "@tanstack/react-query";
import { getTransactionList } from "../api/transactions";

export const useTransactionList = (accountID?: string) => {
  return useQuery({
    queryKey: ["transaction", accountID ? accountID : "All"],
    queryFn: () => getTransactionList(accountID),
    staleTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    refetchOnWindowFocus: false,
  });
};
