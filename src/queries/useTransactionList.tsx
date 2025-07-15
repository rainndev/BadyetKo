import { useQuery } from "@tanstack/react-query";
import { getTransactionList } from "../api/transactions";

export const useTransactionList = (bankID?: string) => {
  return useQuery({
    queryKey: ["transaction", bankID ? bankID : "All"],
    queryFn: () => getTransactionList(bankID),
    staleTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    refetchOnWindowFocus: false,
  });
};
