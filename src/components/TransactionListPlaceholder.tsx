const TransactionListPlaceholder = () => {
  return (
    <div className="bg-dark-background/50 flex w-full animate-pulse justify-between rounded-xl py-2 transition-colors ease-in-out">
      <div className="flex flex-col">
        <div className="invisible flex w-full items-center justify-between">
          <div>
            {/* tx name */}
            <div className="flex items-center justify-start gap-2">
              <h1 className="text-fluid-base invisible max-w-[10rem] truncate text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
                test
              </h1>
            </div>

            {/* tx note */}
            <p className="text-dark-txt/50 text-fluid-sm invisible w-fit max-w-[10rem] truncate text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
              test note
            </p>
          </div>
        </div>

        {/* tx type */}
        <div className="text-fluid-xs invisible mt-1 flex items-center gap-2">
          <div
            style={{}}
            className={`flex items-center justify-center rounded-2xl border px-2`}
          >
            <p
              className={`text-dark-txt/80 w-fit max-w-[5rem] truncate rounded-full px-1 py-0.5 text-center font-medium first-letter:capitalize sm:max-w-[10rem] md:px-2`}
            >
              Uncategorized
            </p>
          </div>
        </div>
      </div>
      {/* tx amount */}
      <div
        className={`invisible flex flex-col items-end justify-center font-semibold`}
      >
        <p className="text-fluid-base text-center text-nowrap tabular-nums">
          -PHP 19999
        </p>
        <p className="text-dark-txt/50 text-fluid-xs font-medium">12/23/523</p>
      </div>
    </div>
  );
};

export default TransactionListPlaceholder;
