import { useQuery } from "@tanstack/react-query";
import { getBankList } from "../api/bank";

export const useBankList = () =>
  useQuery({
    queryKey: ["banks"],
    queryFn: getBankList,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
