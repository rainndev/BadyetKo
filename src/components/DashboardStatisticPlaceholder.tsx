const DashboardStatisticPlaceholder = () => {
  return [...new Array(6)].map((_, idx) => (
    <div
      key={"placeholder" + idx}
      className="bg-dark-background/50 flex w-full animate-pulse items-center justify-between rounded-2xl p-5 shadow-xl md:p-7"
    >
      <div className="invisible">
        <p className="text-light-background/60 text-[clamp(.5rem,1vw+.5rem,0.875rem)] font-thin">
          Max Deposit
        </p>
        <h1 className="text-light-background text-[clamp(.4rem,2vw+.4rem,1rem)] font-medium tabular-nums">
          9.999.999.999
        </h1>
      </div>
    </div>
  ));
};

export default DashboardStatisticPlaceholder;
