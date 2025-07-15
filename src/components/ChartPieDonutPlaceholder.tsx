const ChartPieDonutPlaceholder = () => {
  return [...new Array(5)].map((_, idx) => (
    <div
      key={"category-sample" + idx}
      className="bg-dark-background/50 flex w-fit items-center gap-2 rounded-full p-2 px-4 text-[clamp(.5rem,1vw+.5rem,.85rem)] leading-none font-medium"
    >
      <span className="text-dark-txt/90 text-nowrap">
        <p className="invisible">category</p>
      </span>
    </div>
  ));
};

export default ChartPieDonutPlaceholder;
