import { SymbolSwitcher } from "@/components/SymbolSwitcher";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import CurrencyMaskAmounts from "@/components/CurrencyMaskAmounts";

const SettingsPage = () => {
  return (
    <div className="flex h-screen w-full flex-col gap-10 p-5 md:p-10">
      {/* currency changer */}
      <div className="space-y-2">
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Currency
        </h1>

        <CurrencySwitcher />
        <SymbolSwitcher />
        <CurrencyMaskAmounts />
      </div>

      {/* hide transaction */}
      <div>
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Transaction Privacy
        </h1>
      </div>
    </div>
  );
};

export default SettingsPage;
