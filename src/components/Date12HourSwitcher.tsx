import { useDateTimeStore } from "@/store/DateTimeStore";
import { Switch } from "@/components/ui/switch";

const Date12HourSwitcher = () => {
  const isHour12Enabled = useDateTimeStore((state) => state.isHour12Enabled);
  const isTimeAgoEnabled = useDateTimeStore((state) => state.isTimeAgoEnabled);
  const setHour12Enabled = useDateTimeStore((state) => state.setHour12Enabled);

  return (
    <div
      className={` ${isTimeAgoEnabled ? "bg-dark-background/3 text-dark-txt/50" : "bg-dark-background/5"} flex w-full shrink-0 flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 ease-in-out`}
    >
      <h1 className="text-[clamp(.9rem,2vw+.9rem,1rem)] font-semibold">
        12-Hour Time Format
      </h1>
      <p className="text-muted-foreground text-[clamp(.5rem,2vw+.5rem,0.875rem)]">
        Toggle between 12-hour (AM/PM) and 24-hour time display formats.
      </p>
      <div className="flex items-center gap-2">
        <Switch
          disabled={isTimeAgoEnabled}
          className="cursor-pointer !text-[clamp(.9rem,2vw+.9rem,1rem)]"
          onCheckedChange={() => setHour12Enabled(!isHour12Enabled)}
          checked={isHour12Enabled}
          id="date-hour12-switcher"
        />
        <label
          className="cursor-pointer text-nowrap"
          htmlFor="date-hour12-switcher"
        >
          {isHour12Enabled ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default Date12HourSwitcher;
