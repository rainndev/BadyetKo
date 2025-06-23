import { useQuery } from "@tanstack/react-query";
import { getBankList } from "../api/bank";

export const useBankList = (user_id: string) =>
  useQuery({
    queryKey: [`banks-${user_id}`],
    queryFn: getBankList,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
