import { useQuery } from "@tanstack/react-query";
import { getAccountList } from "../api/account";

export const useAccountList = (user_id: string) =>
  useQuery({
    queryKey: ["accounts", user_id],
    queryFn: getAccountList,
    staleTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    enabled: !!user_id,
    refetchOnWindowFocus: false,
  });
