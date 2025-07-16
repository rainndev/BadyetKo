import { useQuery } from "@tanstack/react-query";
import { getCategoryPieData } from "@/api/user";

export const useCategoryPieData = () =>
  useQuery({
    queryKey: ["category-pie-data"],
    queryFn: getCategoryPieData,
    staleTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    refetchOnWindowFocus: false,
  });
