import { useCurrencyStore } from "@/store/CurrencyStore";
import { CiWallet } from "react-icons/ci";
import LoadingPulse from "./LoadingPulse";

type transactionData = {
  amount: number;
  type: string;
  name: string;
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
    <div className="border-dark-background/20 @container flex w-full flex-col items-start justify-center gap-10 rounded-3xl border p-5 py-7 md:px-15 md:py-10">
      <div>
        {isLoading ? (
          <div className="bg-dark-background/50 animate-pulse rounded-sm md:rounded-lg">
            &nbsp;
          </div>
        ) : (
          <span className="flex items-center gap-3">
            <h1 className="text-[clamp(1.1rem,2vw+1.1rem,2rem)] font-semibold tabular-nums">
              {getformattedAmount(total_balance)}
            </h1>

            <CiWallet className="text-[clamp(1rem,2vw+1rem,1.875rem)]" />
          </span>
        )}

        <p className="text-dark-txt/60 text-sm">Net balance</p>
      </div>

      {isLoading ? (
        <LoadingPulse />
      ) : (
        <div className="grid w-full grid-cols-1 justify-between gap-5 @sm:grid-cols-2">
          {TXStat?.map((txItemData) => (
            <div key={txItemData.label}>
              <h1 className="text-[clamp(.6rem,2vw+.6rem,1.3rem)] font-medium tabular-nums">
                {txItemData.amount
                  ? getformattedAmount(txItemData.amount)
                  : "0"}
              </h1>
              <p className="text-dark-txt/60 text-sm">{txItemData.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardStatisticCard;
