import { CiWallet } from "react-icons/ci";
import { IoTrendingUp } from "react-icons/io5";

const DashboardStatisticPlaceholder = () => {
  return (
    <div
      key="net_balance"
      className="bg-dark-background/50 flex h-fit animate-pulse flex-col items-start gap-2 rounded-2xl p-5 shadow-xl [grid-area:grid1] md:p-7"
    >
      <div className="invisible">
        <p className="text-light-background/60 text-fluid-sm font-thin">
          Cumulative Balance
        </p>
        <h1 className="text-fluid-2xl text-light-background mt-1 flex items-center gap-2 font-semibold tabular-nums">
          <span>9999</span>
          <CiWallet />
        </h1>
      </div>

      <div className="invisible mt-5 flex w-full justify-between gap-2">
        {/* total deposit */}
        <div>
          <p className="text-light-background/60 text-fluid-sm flex items-center gap-2 font-thin">
            <span>Total Deposit</span>
            <IoTrendingUp className="text-green-300 drop-shadow-lg drop-shadow-green-400" />
          </p>
          <h1 className="text-light-background text-fluid-sm @lg:text-fluid-base mt-1 font-medium tabular-nums">
            9999
          </h1>
        </div>

        {/* total withdraw */}
        <div>
          <p className="text-light-background/60 text-fluid-sm flex gap-2 font-thin">
            <span>Total Withdraw</span>
            <IoTrendingUp className="rotate-180 text-red-300 drop-shadow-lg drop-shadow-red-400" />
          </p>
          <h1 className="text-fluid-sm @lg:text-fluid-base text-light-background mt-1 font-semibold tabular-nums">
            99999
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatisticPlaceholder;
