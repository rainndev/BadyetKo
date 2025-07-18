type DashboardStatisticPlaceholderProps = {
  count: number;
};

const DashboardStatisticPlaceholder = ({
  count,
}: DashboardStatisticPlaceholderProps) => {
  return [...new Array(count)].map((_, idx) => (
    <div
      key={"placeholder" + idx}
      className="bg-dark-background/50 flex w-full animate-pulse items-center justify-between rounded-2xl p-5 shadow-xl md:p-7"
    >
      <div className="invisible">
        <p className="text-light-background/60 text-fluid-sm font-thin">
          Max Deposit
        </p>
        <h1 className="text-light-background text-fluid-base font-medium tabular-nums">
          9.999.999.999
        </h1>
      </div>
    </div>
  ));
};

export default DashboardStatisticPlaceholder;
