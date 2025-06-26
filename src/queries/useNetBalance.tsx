import { useQuery } from "@tanstack/react-query";
import { getNetBalance } from "@/api/user";

export const useNetBalance = (user_id: string) =>
  useQuery({
    queryKey: ["users", user_id],
    queryFn: getNetBalance,
    enabled: !!user_id,
    refetchOnWindowFocus: false,
  });
