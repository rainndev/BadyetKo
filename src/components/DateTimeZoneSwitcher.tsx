import { useDateTimeStore } from "@/store/DateTimeStore";
import { Switch } from "@/components/ui/switch";

const DateTimeZoneSwitcher = () => {
  const isDateToDDMMYYYY = useDateTimeStore((state) => state.isDateToDDMMYYYY);
  const isTimezoneEnabled = useDateTimeStore(
    (state) => state.isTimezoneEnabled,
  );
  const setTimezoneEnabled = useDateTimeStore(
    (state) => state.setTimezoneEnabled,
  );
  const isTimeAgoEnabled = useDateTimeStore((state) => state.isTimeAgoEnabled);
  const isDisabled = isTimeAgoEnabled || isDateToDDMMYYYY;

  return (
    <div
      className={` ${isDisabled ? "bg-dark-background/3 text-dark-txt/50" : "bg-dark-background/5"} flex w-full shrink-0 flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 ease-in-out`}
    >
      <h1 className="text-fluid-lg font-semibold">Show Time Zone</h1>
      <p className="text-muted-foreground text-fluid-sm">
        Toggle whether the time zone is displayed alongside the time.
      </p>
      <div className="flex items-center gap-2">
        <Switch
          disabled={isDisabled}
          className="!text-fluid-base cursor-pointer"
          onCheckedChange={() => setTimezoneEnabled(!isTimezoneEnabled)}
          checked={isTimezoneEnabled}
          id="date-timezone-switcher"
        />
        <label
          className="hidden cursor-pointer text-nowrap @lg:block"
          htmlFor="date-timezone-switcher"
        >
          {isTimezoneEnabled ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default DateTimeZoneSwitcher;
