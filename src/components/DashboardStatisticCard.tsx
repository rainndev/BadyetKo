import { useCurrencyStore } from "@/store/CurrencyStore";
import { CiSaveDown2 } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";

type transactionData = {
  amount: number;
  type: string;
  label: "MAX" | "MIN";
};

type DashboardStatisticCardProps = {
  data: {
    total_balance: number;
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

  const { total_balance, TXStat } = data;

  return (
    <div className="border-dark-background/20 flex w-full flex-col items-start justify-center gap-5 rounded-3xl border p-5 py-7 md:px-15 md:py-10">
      <div>
        <CiWallet className="text-[clamp(1rem,2vw+1rem,1.875rem)]" />

        {isLoading ? (
          <div className="bg-dark-background/30 w-30 animate-pulse rounded-sm text-2xl">
            &nbsp;
          </div>
        ) : (
          <h1 className="text-[clamp(.6rem,2vw+.6rem,1.5rem)] font-semibold tabular-nums">
            {getformattedAmount(total_balance)}
          </h1>
        )}

        <p className="text-dark-txt/60 text-sm">Net balance</p>
      </div>
      <div>
        <CiSaveDown2 className="rotate-180 text-[clamp(1rem,2vw+1rem,1.875rem)]" />
        {isLoading ? (
          <div className="bg-dark-background/30 w-30 animate-pulse rounded-sm text-2xl">
            &nbsp;
          </div>
        ) : (
          <h1 className="text-[clamp(.6rem,2vw+.6rem,1.5rem)] font-semibold tabular-nums">
            {TXStat && TXStat[0] ? getformattedAmount(TXStat[0].amount) : "0"}
          </h1>
        )}
        <p className="text-dark-txt/60 text-sm">Highest Transaction</p>
      </div>

      <div>
        <CiSaveDown2 className="text-[clamp(1rem,2vw+1rem,1.875rem)]" />
        {isLoading ? (
          <div className="bg-dark-background/30 w-30 animate-pulse rounded-sm text-2xl">
            &nbsp;
          </div>
        ) : (
          <h1 className="text-[clamp(.6rem,2vw+.6rem,1.5rem)] font-semibold tabular-nums">
            {TXStat && TXStat[1] ? getformattedAmount(TXStat[1].amount) : "0"}
          </h1>
        )}
        <p className="text-dark-txt/60 text-sm">Lowest Transaction</p>
      </div>
    </div>
  );
};

export default DashboardStatisticCard;
