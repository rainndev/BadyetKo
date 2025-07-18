import { Switch } from "@/components/ui/switch";
import { useCurrencyStore } from "@/store/CurrencyStore";

export function SymbolSwitcher() {
  const isISOSymbol = useCurrencyStore((state) => state.isISOSymbol);
  const setISOSymbol = useCurrencyStore((state) => state.setISOSymbol);

  return (
    <div className="bg-dark-background/5 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
      <div className="min-w-40 flex-1">
        <h1 className="text-fluid-lg font-semibold">Currency Format Toggle</h1>
        <p className="text-muted-foreground text-fluid-sm">
          Switch between using the currency symbol (₱) and the ISO code (PHP)
          when displaying amounts.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Switch
          className="!text-fluid-base cursor-pointer"
          onCheckedChange={() => setISOSymbol(!isISOSymbol)}
          checked={isISOSymbol}
          id="currency-symbol-switcher"
        />
        <label
          className="hidden cursor-pointer text-nowrap @lg:block"
          htmlFor="currency-symbol-switcher"
        >
          {isISOSymbol ? "Enabled" : "Disabled"}
        </label>
      </div>
    </div>
  );
}
