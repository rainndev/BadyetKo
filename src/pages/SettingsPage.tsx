import { useCurrencyStore } from "@/store/CurrencyStore";
import { SymbolSwitcher } from "@/components/SymbolSwitcher";
import CurrencySwitcher from "@/components/CurrencySwitcher";

const SettingsPage = () => {
  const setMaskNumber = useCurrencyStore((state) => state.setMasked);
  const isMasked = useCurrencyStore((state) => state.isMasked);

  return (
    <div className="flex h-screen w-full flex-col gap-10 p-5 md:p-10">
      {/* currency changer */}
      <div className="space-y-2">
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Currency
        </h1>

        <CurrencySwitcher />
        <SymbolSwitcher />
      </div>

      {/* hide transaction */}

      <div>
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
          Transaction Privacy
        </h1>
        <button
          className="bg-dark-background hover:bg-dark-background/90 text-light-background cursor-pointer rounded-lg p-3 px-6 text-[clamp(.6rem,1vw+.6rem,1rem)] transition-colors ease-in-out"
          onClick={() => setMaskNumber(!isMasked)}
        >
          {isMasked ? "Show Full Amounts" : "Mask Amounts"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
