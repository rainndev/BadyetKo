import { useDateTimeStore } from "@/store/DateTimeStore";
import { Switch } from "@/components/ui/switch";

const DateDDMMYYYYSwitcher = () => {
  const isTimeAgoEnabled = useDateTimeStore((state) => state.isTimeAgoEnabled);
  const isDateToDDMMYYYY = useDateTimeStore((state) => state.isDateToDDMMYYYY);
  const setDateToDDMMYYYY = useDateTimeStore(
    (state) => state.setDateToDDMMYYYY,
  );

  console.log(isDateToDDMMYYYY);
  return (
    <div
      className={`${isTimeAgoEnabled ? "bg-dark-background/3 text-dark-txt/50" : "bg-dark-background/5"} flex w-full shrink-0 flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 ease-in-out`}
    >
      <h1 className="text-[clamp(.9rem,2vw+.9rem,1rem)] font-semibold">
        Date Format Toggle
      </h1>
      <p className="text-muted-foreground text-[clamp(.5rem,2vw+.5rem,0.875rem)]">
        Switch between default date format and European style (DD/MM/YYYY).
      </p>
      <div className="flex items-center gap-2">
        <Switch
          disabled={isTimeAgoEnabled}
          className="cursor-pointer !text-[clamp(.9rem,2vw+.9rem,1rem)]"
          onCheckedChange={() => setDateToDDMMYYYY(!isDateToDDMMYYYY)}
          checked={isDateToDDMMYYYY}
          id="date-timeago-switcher"
        />
        <label
          className="cursor-pointer text-nowrap"
          htmlFor="date-timeago-switcher"
        >
          {isDateToDDMMYYYY ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default DateDDMMYYYYSwitcher;
