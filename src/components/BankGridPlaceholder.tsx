const BankGridPlaceholder = () => {
  return (
    <div className="bg-dark-background/50 relative flex w-full animate-pulse cursor-pointer flex-col items-start justify-center rounded-2xl p-5 md:rounded-3xl md:p-7">
      <div className="flex w-full items-center justify-center gap-5">
        <div className="flex size-8 items-center justify-center">
          <div className="invisible min-h-10 w-full min-w-10 md:min-h-12 md:min-w-12">
            test
          </div>
        </div>
      </div>

      <p className="text-dark-txt/80 text-fluid-sm invisible mt-5 max-w-fit truncate tabular-nums">
        $999.999
      </p>
    </div>
  );
};

export default BankGridPlaceholder;
