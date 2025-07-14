import { useDateTimeStore } from "@/store/DateTimeStore";
import { Switch } from "@/components/ui/switch";

const DateTimeAgoSwitcher = () => {
  const isDateToDDMMYYYY = useDateTimeStore((state) => state.isDateToDDMMYYYY);
  const isTimeAgoEnabled = useDateTimeStore((state) => state.isTimeAgoEnabled);
  const setTimeAgoEnabled = useDateTimeStore(
    (state) => state.setTimeAgoEnabled,
  );

  console.log(isTimeAgoEnabled);
  return (
    <div
      className={`${isDateToDDMMYYYY ? "bg-dark-background/3 text-dark-txt/50" : "bg-dark-background/5"} flex w-full shrink-0 flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 ease-in-out`}
    >
      <h1 className="text-[clamp(.9rem,2vw+.9rem,1rem)] font-semibold">
        Relative Time Format
      </h1>
      <p className="text-muted-foreground text-[clamp(.5rem,2vw+.5rem,0.875rem)]">
        Toggle between relative time (e.g. “2 minutes ago”) and absolute
        timestamps.
      </p>
      <div className="flex items-center gap-2">
        <Switch
          disabled={isDateToDDMMYYYY}
          className="cursor-pointer !text-[clamp(.9rem,2vw+.9rem,1rem)]"
          onCheckedChange={() => setTimeAgoEnabled(!isTimeAgoEnabled)}
          checked={isTimeAgoEnabled}
          id="date-timeago-switcher"
        />
        <label
          className="cursor-pointer text-nowrap"
          htmlFor="date-timeago-switcher"
        >
          {isTimeAgoEnabled ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default DateTimeAgoSwitcher;
