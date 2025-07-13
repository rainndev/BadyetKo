import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categories";

export const useCategoryList = (user_id: string) =>
  useQuery({
    queryKey: ["category", user_id],
    queryFn: getCategories,
    enabled: !!user_id,
    refetchOnWindowFocus: false,
  });
