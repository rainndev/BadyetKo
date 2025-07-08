import { useQuery } from "@tanstack/react-query";
import { getUserStatistics } from "@/api/user";

export const useUserStatistic = (user_id: string) => {
  const { data: userStatistic, isLoading: isLoadingUserStatistic } = useQuery({
    queryKey: ["users", user_id],
    queryFn: getUserStatistics,
    enabled: !!user_id,
    refetchOnWindowFocus: false,
  });

  const userStat =
    Array.isArray(userStatistic?.userData) && userStatistic.userData.length > 0
      ? userStatistic.userData[0]
      : null;

  const TXStat =
    Array.isArray(userStatistic?.transactionData) &&
    userStatistic.transactionData.length > 0
      ? userStatistic.transactionData
      : null;

  const total_balance = userStat?.net_balance ?? 0;
  const total_deposit = userStat?.total_deposit ?? 0;
  const total_withdraw = userStat?.total_withdraw ?? 0;
  const lowest_tx_made = TXStat ? TXStat[1] : null;
  const highest_tx_made = TXStat ? TXStat[0] : null;

  return {
    userStatistic,
    isLoadingUserStatistic,
    total_balance,
    total_deposit,
    total_withdraw,
    lowest_tx_made,
    highest_tx_made,
  };
};
