import { useDateTimeStore } from "@/store/DateTimeStore";
import { Switch } from "@/components/ui/switch";

const DateSecondsSwitcher = () => {
  const isDateToDDMMYYYY = useDateTimeStore((state) => state.isDateToDDMMYYYY);
  const isSecondEnabled = useDateTimeStore((state) => state.isSecondEnabled);
  const setSecondEnabled = useDateTimeStore((state) => state.setSecondEnabled);
  const isTimeAgoEnabled = useDateTimeStore((state) => state.isTimeAgoEnabled);

  const isDisabled = isTimeAgoEnabled || isDateToDDMMYYYY;
  return (
    <div
      className={`${isDisabled ? "bg-dark-background/3 text-dark-txt/50" : "bg-dark-background/5"} flex w-full shrink-0 flex-col gap-3 rounded-2xl p-5 transition-colors duration-300 ease-in-out`}
    >
      <h1 className="text-fluid-lg font-semibold">Show Seconds</h1>
      <p className="text-muted-foreground text-fluid-sm">
        Toggle whether seconds are shown in the time display.
      </p>
      <div className="flex items-center gap-2">
        <Switch
          disabled={isDisabled}
          className="!text-fluid-base cursor-pointer"
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
