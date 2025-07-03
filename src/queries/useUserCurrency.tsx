import { getUserCurrency } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useUserCurrency(userId?: string) {
  return useQuery({
    queryKey: ["user-currency", userId],
    queryFn: () => getUserCurrency(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 60,
  });
}
