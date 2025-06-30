import { type ReactElement, cloneElement } from "react";

type DashboardStatisticCardProps = {
  svg: ReactElement<any>;
  amount: number;
  name: string;
};
const DashboardStatisticCard = ({
  svg,
  amount,
  name,
}: DashboardStatisticCardProps) => {
  return (
    <div className="border-dark-background/15 flex w-fit flex-col items-center justify-center gap-1.5 rounded-3xl border px-15 py-10">
      {cloneElement(svg, { className: "text-3xl" })}

      <h1 className="text-2xl font-semibold">
        {"\u20B1"}
        {amount}
      </h1>
      <p className="text-md font-normal">{name}</p>
    </div>
  );
};

export default DashboardStatisticCard;
