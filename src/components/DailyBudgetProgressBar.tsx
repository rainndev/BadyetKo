import { Progress } from "@/components/ui/progress";
import { useCurrencyStore } from "@/store/CurrencyStore";

type DailyBudgetProgressBarProps = {
  todayWithdrawSumData: number;
  daily_budget: number;
};

const DailyBudgetProgressBar = ({
  todayWithdrawSumData,
  daily_budget,
}: DailyBudgetProgressBarProps) => {
  const progress = (todayWithdrawSumData / daily_budget) * 100;

  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  console.log(progress);
  return (
    <div>
      <h1 className="text-fluid-base">
        {getformattedAmount(todayWithdrawSumData)} /{" "}
        {getformattedAmount(daily_budget)}
      </h1>
      <div className="flex items-center gap-5">
        <Progress value={progress} className="w-full" />
        <span className="text-fluid-base">{progress}%</span>
      </div>
      <p className="text-fluid-sm text-dark-txt/60">Daily Budget</p>
    </div>
  );
};

export default DailyBudgetProgressBar;
