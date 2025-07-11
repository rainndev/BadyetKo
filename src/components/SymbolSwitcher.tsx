import { Switch } from "@/components/ui/switch";
import { useCurrencyStore } from "@/store/CurrencyStore";

export function SymbolSwitcher() {
  const isISOSymbol = useCurrencyStore((state) => state.isISOSymbol);
  const setISOSymbol = useCurrencyStore((state) => state.setISOSymbol);

  return (
    <div className="bg-dark-background/5 mt-5 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
      <div className="min-w-40 flex-1">
        <h1 className="text-[clamp(.9rem,2vw+.9rem,1rem)] font-semibold">
          Currency Format Toggle
        </h1>
        <p className="text-muted-foreground text-[clamp(.5rem,2vw+.5rem,0.875rem)]">
          Switch between using the currency symbol (₱) and the ISO code (PHP)
          when displaying amounts.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Switch
          className="!text-[clamp(.9rem,2vw+.9rem,1rem)]"
          onCheckedChange={() => setISOSymbol(!isISOSymbol)}
          checked={isISOSymbol}
          id="currency-symbol-switcher"
        />
        <label className="text-nowrap" htmlFor="currency-symbol-switcher">
          {isISOSymbol ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
}
