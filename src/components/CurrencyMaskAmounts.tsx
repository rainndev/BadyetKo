import { Switch } from "@/components/ui/switch";
import { useCurrencyStore } from "@/store/CurrencyStore";

const CurrencyMaskAmounts = () => {
  const setMaskNumber = useCurrencyStore((state) => state.setMasked);
  const isMasked = useCurrencyStore((state) => state.isMasked);

  return (
    <div className="bg-dark-background/5 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
      <div className="min-w-40 flex-1">
        <h1 className="text-fluid-lg font-semibold">Mask Amounts</h1>
        <p className="text-muted-foreground text-fluid-sm">
          Hide sensitive currency values with masked placeholders (e.g., ₱••••)
          for added privacy.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Switch
          className="!text-fluid-base cursor-pointer"
          onCheckedChange={() => setMaskNumber(!isMasked)}
          checked={isMasked}
          id="currency-masknumber-switcher"
        />
        <label
          className="cursor-pointer text-nowrap"
          htmlFor="currency-masknumber-switcher"
        >
          {isMasked ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default CurrencyMaskAmounts;
