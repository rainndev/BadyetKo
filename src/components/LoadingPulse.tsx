const LoadingPulse = () => {
  return (
    <div className="w-full space-y-1">
      <p className="bg-dark-background/50 animate-pulse rounded-sm md:rounded-lg">
        &nbsp;
      </p>
      <p className="bg-dark-background/50 animate-pulse rounded-sm md:rounded-lg">
        &nbsp;
      </p>
      <p className="bg-dark-background/50 animate-pulse rounded-sm md:rounded-lg">
        &nbsp;
      </p>
      <p className="bg-dark-background/50 w-[50%] animate-pulse rounded-sm md:rounded-lg">
        &nbsp;
      </p>
    </div>
  );
};

export default LoadingPulse;
