import { useQuery } from "@tanstack/react-query";
import { getUserStatistic } from "@/api/user";

export const useUserStatistic = (user_id: string) =>
  useQuery({
    queryKey: ["users", user_id],
    queryFn: getUserStatistic,
    enabled: !!user_id,
    refetchOnWindowFocus: false,
  });
