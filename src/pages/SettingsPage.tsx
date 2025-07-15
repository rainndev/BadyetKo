import { SymbolSwitcher } from "@/components/SymbolSwitcher";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import CurrencyMaskAmounts from "@/components/CurrencyMaskAmounts";
import Date12HourSwitcher from "@/components/Date12HourSwitcher";
import DateSecondsSwitcher from "@/components/DateSecondsSwitcher";
import DateTimeZoneSwitcher from "@/components/DateTimeZoneSwitcher";
import DateTimeAgoSwitcher from "@/components/DateTimeAgoSwitcher";
import supabase from "@/supabase/supabase-client";
import { useSession } from "@/context/SessionContext";
import DateDDMMYYYYSwitcher from "@/components/DateDDMMYYYYSwitcher";
import TransactionLabelSwitcher from "@/components/TransactionLabelSwitcher";
import { user_settings } from "@/data/settingsSaveOptions";

const SettingsPage = () => {
  const { userID } = useSession();
  const handleSaveSettings = async () => {
    console.log("settings config", user_settings);
    await supabase.from("users").update({ user_settings }).eq("id", userID);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-start gap-10 p-5 md:p-10">
      {/* currency changer */}

      <div className="w-full space-y-2">
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Currency
        </h1>

        <CurrencySwitcher />
        <SymbolSwitcher />
        <CurrencyMaskAmounts />
      </div>

      {/* date and time */}
      <div className="w-full">
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Date & Time Format
        </h1>

        <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Date12HourSwitcher />
          <DateSecondsSwitcher />
          <DateTimeZoneSwitcher />
          <DateTimeAgoSwitcher />
          <DateDDMMYYYYSwitcher />
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Transaction List
        </h1>

        <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <TransactionLabelSwitcher />
        </div>
      </div>

      {/* save settings button */}
      <button
        onClick={() => handleSaveSettings()}
        className="bg-dark-background hover:bg-dark-background/90 text-light-background mt-5 cursor-pointer rounded-lg p-3 px-6 text-[clamp(.6rem,1vw+.6rem,1rem)] transition-colors ease-in-out"
      >
        Save settings
      </button>
      <div className="h-20" />
    </div>
  );
};

export default SettingsPage;
