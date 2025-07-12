import { useDateTimeStore } from "@/store/DateTimeStore";
import { Switch } from "@/components/ui/switch";

const DateSecondsSwitcher = () => {
  const isSecondEnabled = useDateTimeStore((state) => state.isSecondEnabled);
  const setSecondEnabled = useDateTimeStore((state) => state.setSecondEnabled);
  const isTimeAgoEnabled = useDateTimeStore((state) => state.isTimeAgoEnabled);

  return (
    <div
      className={` ${isTimeAgoEnabled ? "bg-dark-background/3 text-dark-txt/50" : "bg-dark-background/5"} flex w-full shrink-0 flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 ease-in-out`}
    >
      <h1 className="text-[clamp(.9rem,2vw+.9rem,1rem)] font-semibold">
        Show Seconds
      </h1>
      <p className="text-muted-foreground text-[clamp(.5rem,2vw+.5rem,0.875rem)]">
        Toggle whether seconds are shown in the time display.
      </p>
      <div className="flex items-center gap-2">
        <Switch
          disabled={isTimeAgoEnabled}
          className="cursor-pointer !text-[clamp(.9rem,2vw+.9rem,1rem)]"
          onCheckedChange={() => setSecondEnabled(!isSecondEnabled)}
          checked={isSecondEnabled}
          id="date-seconds-switcher"
        />
        <label
          className="cursor-pointer text-nowrap"
          htmlFor="date-seconds-switcher"
        >
          {isSecondEnabled ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default DateSecondsSwitcher;
