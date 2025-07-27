import { IoTrendingUp } from "react-icons/io5";

const DashboardStatisticPlaceholder = () => {
  return (
    <div className="bg-dark-background/50 relative mb-3 h-fit animate-pulse rounded-3xl">
      {/* Overlay rendered first and pushed to back */}
      <div className="invisible absolute inset-0 -bottom-2 z-5 mx-3 rounded-3xl bg-[#484848] @lg:-bottom-4 @lg:mx-4" />
      <div className="invisible absolute inset-0 -bottom-1 z-5 mx-1 rounded-3xl bg-[#353535] @lg:-bottom-2 @lg:mx-2" />

      {/* Card content on top */}
      <div className="invisible relative z-10 flex w-full flex-col items-start justify-between gap-10 rounded-3xl">
        <div className="h-full w-full">
          <div className="bg-dark-background flex h-fit flex-col items-start gap-2 rounded-2xl p-5 shadow-xl md:rounded-3xl md:p-10">
            {/* Cumulative Balance */}
            <div key="net_balance">
              <p className="text-light-background/60 text-fluid-sm font-thin">
                Cumulative Balance
              </p>
              <h1 className="text-fluid-2xl text-light-background mt-1 flex items-center gap-2 font-semibold tabular-nums">
                <span>99999999999999</span>
              </h1>
            </div>

            {/* Deposit & Withdraw */}
            <div className="mt-5 flex w-full justify-between gap-2">
              <div>
                <p className="text-light-background/60 text-fluid-xs flex items-center gap-2 font-thin">
                  <span>Total Deposit</span>
                  <IoTrendingUp className="text-green-300 drop-shadow-lg drop-shadow-green-400" />
                </p>
                <h1 className="text-light-background text-fluid-sm @lg:text-fluid-lg mt-1 font-medium tabular-nums">
                  9999999999
                </h1>
              </div>

              <div>
                <p className="text-light-background/60 text-fluid-xs flex gap-2 font-thin">
                  <span>Total Withdrawal</span>
                  <IoTrendingUp className="rotate-180 text-red-300 drop-shadow-lg drop-shadow-red-400" />
                </p>
                <h1 className="text-fluid-sm @lg:text-fluid-lg text-light-background mt-1 font-semibold tabular-nums">
                  9999999
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatisticPlaceholder;
