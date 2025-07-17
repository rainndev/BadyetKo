import { useQuery } from "@tanstack/react-query";
import { getBankBalance } from "@/api/bank";

export const useBankNetBalance = (bankId: string) =>
  useQuery({
    queryKey: ["bank-net-balance", bankId],
    queryFn: () => getBankBalance(bankId),
    staleTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    enabled: !!bankId,
    refetchOnWindowFocus: false,
  });
