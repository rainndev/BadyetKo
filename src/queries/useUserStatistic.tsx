import { useQuery } from "@tanstack/react-query";
import { getUserStatistic } from "@/api/user";

export const useUserStatistic = (user_id: string) => {
  const { data: userStatistic, isLoading: isLoadingUserStatistic } = useQuery({
    queryKey: ["users", user_id],
    queryFn: getUserStatistic,
    enabled: !!user_id,
    refetchOnWindowFocus: false,
  });

  const userStat =
    Array.isArray(userStatistic) && userStatistic.length > 0
      ? userStatistic[0]
      : null;

  const total_balance = userStat?.net_balance ?? 0;
  const total_deposit = userStat?.total_deposit ?? 0;
  const total_withdraw = userStat?.total_withdraw ?? 0;

  return {
    userStatistic,
    isLoadingUserStatistic,
    total_balance,
    total_deposit,
    total_withdraw,
  };
};
