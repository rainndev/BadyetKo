import { CircleOff } from "lucide-react";

const TransactionListPlaceholder = () => {
  return (
    <div className="bg-dark-background/50 flex w-full animate-pulse items-center gap-2 rounded-lg p-4 transition-colors ease-in-out md:p-6">
      {/* category icon */}
      <div className="text-fluid-sm invisible h-fit rounded-lg p-2">
        <CircleOff className="size-4" />
      </div>

      <div className="invisible flex w-full flex-col items-start justify-center truncate">
        {/* tx name */}
        <h1 className="text-fluid-base max-w-full truncate text-start text-nowrap">
          test
        </h1>

        {/* tx note */}
        <p className="text-dark-txt/50 text-fluid-xs w-fit max-w-full truncate rounded-lg text-nowrap">
          test
        </p>
      </div>

      <div className="invisible mt-1 ml-4 flex h-full w-full items-center justify-end gap-2 md:mt-0">
        {/* tx amount and date */}
        <div className={`flex flex-col items-end font-semibold`}>
          {/* tx amount */}
          <p className={`text-fluid-sm text-center text-nowrap tabular-nums`}>
            test
          </p>
          {/* tx date */}
          <p className="text-dark-txt/50 text-fluid-xs font-medium">test</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionListPlaceholder;
