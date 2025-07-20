import { useCurrencyStore } from "@/store/CurrencyStore";
import { CiWallet } from "react-icons/ci";
import { IoTrendingUp } from "react-icons/io5";
import DashboardStatisticPlaceholder from "./DashboardStatisticPlaceholder";
import { useUserStatistic } from "@/queries/useUserStatistic";
import { useSession } from "@/context/SessionContext";

const DashboardStatisticCard = () => {
  //GET NET BALANCE
  const { userID } = useSession();

  const {
    total_balance,
    total_deposit,
    total_withdraw,
    isLoadingUserStatistic,
  } = useUserStatistic(userID);

  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  return (
    <div className="@container mb-10 flex w-full flex-col items-start justify-between gap-10 rounded-3xl">
      <div className="h-full w-full">
        {/* total deposit and withdrawals render */}
        <div className="h-full">
          {/* loading placeholder */}
          {isLoadingUserStatistic && <DashboardStatisticPlaceholder />}

          {/* total deposit and withdrawals render */}
          {!isLoadingUserStatistic && (
            <div
              key="net_balance"
              className="bg-dark-background flex h-fit flex-col items-start gap-2 rounded-2xl p-5 shadow-xl [grid-area:grid1] md:p-7"
            >
              <div>
                <p className="text-light-background/60 text-fluid-sm font-thin">
                  Cumulative Balance
                </p>
                <h1 className="text-fluid-2xl text-light-background mt-1 flex items-center gap-2 font-semibold tabular-nums">
                  <span>{getformattedAmount(total_balance)}</span>
                  <CiWallet />
                </h1>
              </div>

              <div className="mt-5 flex w-full justify-between gap-2">
                {/* total deposit */}
                <div>
                  <p className="text-light-background/60 text-fluid-xs flex items-center gap-2 font-thin">
                    <span>Total Deposit</span>
                    <IoTrendingUp className="text-green-300 drop-shadow-lg drop-shadow-green-400" />
                  </p>
                  <h1 className="text-light-background text-fluid-sm @lg:text-fluid-lg mt-1 font-medium tabular-nums">
                    {total_deposit
                      ? getformattedAmount(total_deposit)
                      : getformattedAmount(0)}
                  </h1>
                </div>

                {/* total withdraw */}
                <div>
                  <p className="text-light-background/60 text-fluid-xs flex gap-2 font-thin">
                    <span>Total Withdraw</span>
                    <IoTrendingUp className="rotate-180 text-red-300 drop-shadow-lg drop-shadow-red-400" />
                  </p>
                  <h1 className="text-fluid-sm @lg:text-fluid-lg text-light-background mt-1 font-semibold tabular-nums">
                    {total_withdraw
                      ? getformattedAmount(total_withdraw)
                      : getformattedAmount(0)}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatisticCard;
