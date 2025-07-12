import { useDateTimeStore } from "@/store/DateTimeStore";
import { Switch } from "@/components/ui/switch";

const DateTimeZoneSwitcher = () => {
  const isTimezoneEnabled = useDateTimeStore(
    (state) => state.isTimezoneEnabled,
  );
  const setTimezoneEnabled = useDateTimeStore(
    (state) => state.setTimezoneEnabled,
  );
  const isTimeAgoEnabled = useDateTimeStore((state) => state.isTimeAgoEnabled);

  return (
    <div
      className={` ${isTimeAgoEnabled ? "bg-dark-background/3 text-dark-txt/50" : "bg-dark-background/5"} flex w-full shrink-0 flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 ease-in-out`}
    >
      <h1 className="text-[clamp(.9rem,2vw+.9rem,1rem)] font-semibold">
        Show Time Zone
      </h1>
      <p className="text-muted-foreground text-[clamp(.5rem,2vw+.5rem,0.875rem)]">
        Toggle whether the time zone is displayed alongside the time.
      </p>
      <div className="flex items-center gap-2">
        <Switch
          disabled={isTimeAgoEnabled}
          className="cursor-pointer !text-[clamp(.9rem,2vw+.9rem,1rem)]"
          onCheckedChange={() => setTimezoneEnabled(!isTimezoneEnabled)}
          checked={isTimezoneEnabled}
          id="date-timezone-switcher"
        />
        <label
          className="cursor-pointer text-nowrap"
          htmlFor="date-timezone-switcher"
        >
          {isTimezoneEnabled ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default DateTimeZoneSwitcher;
