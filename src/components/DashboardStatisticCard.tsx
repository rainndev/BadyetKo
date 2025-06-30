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
    <div className=" border border-dark-background/15 w-fit py-10 px-15 rounded-3xl flex items-center flex-col justify-center  gap-1.5">
      {cloneElement(svg, { className: "text-3xl" })}
      <h1 className="font-semibold text-2xl">
        {"\u20B1"}
        {amount}
      </h1>
      <p className="text-md font-normal">{name}</p>
    </div>
  );
};

export default DashboardStatisticCard;
