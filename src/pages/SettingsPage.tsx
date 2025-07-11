import { SymbolSwitcher } from "@/components/SymbolSwitcher";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import CurrencyMaskAmounts from "@/components/CurrencyMaskAmounts";
import Date12HourSwitcher from "@/components/Date12HourSwitcher";
import DateSecondsSwitcher from "@/components/DateSecondsSwitcher";
import DateTimeZoneSwitcher from "@/components/DateTimeZoneSwitcher";

const SettingsPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-10 p-5 md:p-10">
      {/* currency changer */}
      <div className="space-y-2">
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Currency
        </h1>

        <CurrencySwitcher />
        <SymbolSwitcher />
        <CurrencyMaskAmounts />
      </div>

      {/* date and time */}
      <div>
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Date & Time Format
        </h1>

        <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Date12HourSwitcher />
          <DateSecondsSwitcher />
          <DateTimeZoneSwitcher />
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
};

export default SettingsPage;
