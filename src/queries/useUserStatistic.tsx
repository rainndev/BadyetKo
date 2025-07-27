import { useQuery } from "@tanstack/react-query";
import { getUserStatistics } from "@/api/user";
import { useSession } from "@/context/SessionContext";

export const useUserStatistic = () => {
  //GET NET BALANCE
  const { userID } = useSession();

  const { data: userStatistic, isLoading: isLoadingUserStatistic } = useQuery({
    queryKey: ["users", userID],
    queryFn: getUserStatistics,
    staleTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    enabled: !!userID,
    refetchOnWindowFocus: false,
  });

  const userStat =
    Array.isArray(userStatistic?.userData) && userStatistic.userData.length > 0
      ? userStatistic.userData[0]
      : null;

  const todayWithdrawSumData = userStatistic?.todayWithdrawSumData;

  const total_balance = userStat?.net_balance ?? 0;
  const total_deposit = userStat?.total_deposit ?? 0;
  const total_withdraw = userStat?.total_withdraw ?? 0;

  return {
    userStatistic,
    isLoadingUserStatistic,
    total_balance,
    total_deposit,
    total_withdraw,
    todayWithdrawSumData,
  };
};
