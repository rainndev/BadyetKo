import { Progress } from "@/components/ui/progress";

const DailyBudgetPlaceholder = () => {
  return (
    <div className="bg-dark-background/50 animate-pulse rounded-xl md:rounded-3xl">
      <h1 className="text-fluid-base invisible">99999/99999</h1>
      <div className="invisible flex items-center gap-5">
        <Progress value={23} className="w-full" />
        <span className="text-fluid-base">{0}%</span>
      </div>
      <p className="text-fluid-sm text-dark-txt/60 invisible">Daily Budget</p>
    </div>
  );
};

export default DailyBudgetPlaceholder;
