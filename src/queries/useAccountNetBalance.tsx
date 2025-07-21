import { useQuery } from "@tanstack/react-query";
import { getAccountBalance } from "@/api/account";

export const useAccountNetBalance = (accountId: string) =>
  useQuery({
    queryKey: ["account-net-balance", accountId],
    queryFn: () => getAccountBalance(accountId),
    staleTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    enabled: !!accountId,
    refetchOnWindowFocus: false,
  });
