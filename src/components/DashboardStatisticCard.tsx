import { useCurrencyStore } from "@/store/CurrencyStore";
import { type ReactElement, cloneElement } from "react";

type DashboardStatisticCardProps = {
  svg: ReactElement<any>;
  amount: number;
  name: string;
  isLoading: boolean;
};
const DashboardStatisticCard = ({
  svg,
  isLoading,
  amount,
  name,
}: DashboardStatisticCardProps) => {
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  return (
    <div className="border-dark-background/20 flex w-full flex-col items-center justify-center gap-1.5 rounded-3xl border px-15 py-7 md:py-10">
      {cloneElement(svg)}

      {isLoading ? (
        <div className="bg-dark-background/30 w-30 animate-pulse rounded-sm text-2xl">
          &nbsp;
        </div>
      ) : (
        <h1 className="text-[clamp(.6rem,2vw+.6rem,1.5rem)] font-semibold tabular-nums">
          {getformattedAmount(amount)}
        </h1>
      )}

      <p className="text-dark-txt/60 text-sm">{name}</p>
    </div>
  );
};

export default DashboardStatisticCard;
