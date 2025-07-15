import { useCurrencyStore } from "@/store/CurrencyStore";
import { CiWallet } from "react-icons/ci";
import LoadingPulse from "./LoadingPulse";
import { IoTrendingUp } from "react-icons/io5";

type transactionData = {
  amount: number;
  type: string;
  name: string;
  label: "Max Deposit" | "Min Deposit" | "Max Withdraw" | "Min Withdraw";
};

type DashboardStatisticCardProps = {
  data: {
    total_balance: number;
    total_deposit: number;
    total_withdraw: number;
    TXStat?: transactionData[];
  };
  isLoading: boolean;
};
const DashboardStatisticCard = ({
  isLoading,
  data,
}: DashboardStatisticCardProps) => {
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  const { total_balance, total_deposit, total_withdraw, TXStat } = data;

  return (
    <div className="@container flex w-full flex-col items-start justify-between gap-10 rounded-3xl p-2">
      <div className="flex h-full w-full flex-col items-start justify-center">
        {isLoading ? (
          <div className="bg-dark-background/50 animate-pulse rounded-sm md:rounded-lg">
            &nbsp;
          </div>
        ) : (
          <h1 className="text-[clamp(1.1rem,2vw+1.1rem,2.5rem)] font-semibold tabular-nums">
            {getformattedAmount(total_balance)}
          </h1>
        )}

        <p className="text-dark-txt/60 text-sm">Net balance</p>
      </div>

      {isLoading ? (
        <LoadingPulse />
      ) : (
        <div className="grid w-full grid-cols-1 justify-between gap-2 @sm:grid-cols-2 @md:gap-3">
          {TXStat?.map((txItemData) => (
            <div
              key={txItemData.label}
              className="bg-dark-background flex items-center justify-between rounded-2xl p-5 shadow-xl md:p-7"
            >
              <div>
                <p className="text-light-background/60 text-[clamp(.5rem,1vw+.5rem,0.875rem)] font-thin">
                  {txItemData.label}
                </p>
                <h1 className="text-light-background text-[clamp(.4rem,2vw+.4rem,1rem)] font-medium tabular-nums">
                  {txItemData.amount
                    ? getformattedAmount(txItemData.amount)
                    : "0"}
                </h1>
              </div>
              <div>
                {txItemData.label.toLowerCase().includes("max") ? (
                  <IoTrendingUp className="text-green-300 drop-shadow-lg drop-shadow-green-400" />
                ) : (
                  <IoTrendingUp className="rotate-60 text-red-300 drop-shadow-lg drop-shadow-red-400" />
                )}
              </div>
            </div>
          ))}

          <div
            key="total_deposit"
            className="bg-dark-background flex items-center justify-between rounded-2xl p-5 shadow-xl md:p-7"
          >
            <div>
              <p className="text-light-background/60 text-[clamp(.5rem,1vw+.5rem,0.875rem)] font-thin">
                Total Deposit
              </p>
              <h1 className="text-light-background text-[clamp(.4rem,2vw+.4rem,1rem)] font-medium tabular-nums">
                {total_deposit ? getformattedAmount(total_deposit) : "0"}
              </h1>
            </div>
            <div>
              <CiWallet className="text-light-background" />
            </div>
          </div>
          <div
            key="total_withdraw"
            className="bg-dark-background flex items-center justify-between rounded-2xl p-5 shadow-xl md:p-7"
          >
            <div>
              <p className="text-light-background/60 text-[clamp(.5rem,1vw+.5rem,0.875rem)] font-thin">
                Total Withdraw
              </p>
              <h1 className="text-light-background text-[clamp(.4rem,2vw+.4rem,1rem)] font-medium tabular-nums">
                {total_withdraw ? getformattedAmount(total_withdraw) : "0"}
              </h1>
            </div>

            <div>
              <CiWallet className="text-light-background" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStatisticCard;
