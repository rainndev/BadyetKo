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
    TXStat,
  } = useUserStatistic(userID);

  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  return (
    <div className="@container flex w-full flex-col items-start justify-between gap-10 rounded-3xl">
      <div className="h-full w-full">
        {/* total deposit and withdrawals render */}
        <div className="grid h-full gap-1 [grid-template-areas:'grid1_grid1'_'grid2_grid2'_'grid3_grid3'_'grid4_grid5'_'grid6_grid7'] @lg:[grid-template-areas:'grid1_grid1'_'grid2_grid3'_'grid4_grid5'_'grid6_grid7']">
          {/* loading placeholder */}
          {isLoadingUserStatistic && <DashboardStatisticPlaceholder />}

          {/* total deposit and withdrawals render */}
          {!isLoadingUserStatistic && (
            <>
              <div
                key="net_balance"
                className="bg-dark-background flex items-center justify-between rounded-2xl p-5 shadow-xl [grid-area:grid1] md:p-7"
              >
                <div>
                  <p className="text-light-background/60 text-fluid-sm font-thin">
                    Cumulative Balance
                  </p>
                  <h1 className="text-fluid-2xl text-light-background font-semibold tabular-nums">
                    {getformattedAmount(total_balance)}
                  </h1>
                </div>
              </div>

              <div
                key="total_deposit"
                className="bg-dark-background flex items-center justify-between rounded-2xl p-5 shadow-xl [grid-area:grid2] md:p-7"
              >
                <div>
                  <p className="text-light-background/60 text-fluid-xs @lg:text-fluid-sm font-thin">
                    Total Deposit
                  </p>
                  <h1 className="text-light-background text-fluid-sm @lg:text-fluid-base mt-1 font-medium tabular-nums md:mt-2">
                    {total_deposit
                      ? getformattedAmount(total_deposit)
                      : getformattedAmount(0)}
                  </h1>
                </div>
                <div>
                  <CiWallet className="text-light-background" />
                </div>
              </div>
              <div
                key="total_withdraw"
                className="bg-dark-background flex items-center justify-between rounded-2xl p-5 shadow-xl [grid-area:grid3] md:p-7"
              >
                <div>
                  <p className="text-light-background/60 text-fluid-xs @lg:text-fluid-sm font-thin">
                    Total Withdraw
                  </p>
                  <h1 className="text-light-background text-fluid-sm @lg:text-fluid-base mt-1 font-medium tabular-nums md:mt-2">
                    {total_withdraw
                      ? getformattedAmount(total_withdraw)
                      : getformattedAmount(0)}
                  </h1>
                </div>

                <div>
                  <CiWallet className="text-light-background" />
                </div>
              </div>
            </>
          )}

          {/* max and min depo/withdraw */}
          {TXStat?.map((txItemData, idx) => (
            <div
              key={txItemData.label}
              className={`[grid-area:grid${idx + 4}] bg-dark-background flex w-full flex-col items-start justify-between rounded-2xl p-5 shadow-xl md:p-7`}
            >
              <div className="text-fluid-xs @lg:text-fluid-sm flex w-full items-center justify-between gap-2">
                <p className="text-light-background/60 font-thin">
                  {txItemData.label}
                </p>
                <span>
                  {txItemData.label.toLowerCase().includes("max") ? (
                    <IoTrendingUp className="text-green-300 drop-shadow-lg drop-shadow-green-400" />
                  ) : (
                    <IoTrendingUp className="rotate-60 text-red-300 drop-shadow-lg drop-shadow-red-400" />
                  )}
                </span>
              </div>
              <h1 className="text-light-background text-fluid-sm @lg:text-fluid-base mt-1 font-medium tabular-nums md:mt-2">
                {getformattedAmount(txItemData.amount)}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatisticCard;
