import { Switch } from "@/components/ui/switch";
import { useCurrencyStore } from "@/store/CurrencyStore";

const CurrencyMaskAmounts = () => {
  const setMaskNumber = useCurrencyStore((state) => state.setMasked);
  const isMasked = useCurrencyStore((state) => state.isMasked);

  return (
    <div className="bg-dark-background/5 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
      <div className="min-w-40 flex-1">
        <h1 className="text-[clamp(.9rem,2vw+.9rem,1rem)] font-semibold">
          Mask Amounts
        </h1>
        <p className="text-muted-foreground text-[clamp(.5rem,2vw+.5rem,0.875rem)]">
          Hide sensitive currency values with masked placeholders (e.g., ₱••••)
          for added privacy.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Switch
          className="!text-[clamp(.9rem,2vw+.9rem,1rem)]"
          onCheckedChange={() => setMaskNumber(!isMasked)}
          checked={isMasked}
          id="currency-symbol-switcher"
        />
        <label className="text-nowrap" htmlFor="currency-symbol-switcher">
          {isMasked ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
};

export default CurrencyMaskAmounts;
