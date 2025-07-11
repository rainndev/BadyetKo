import { Switch } from "@/components/ui/switch";
import { useCurrencyStore } from "@/store/CurrencyStore";

export function SymbolSwitcher() {
  const isISOSymbol = useCurrencyStore((state) => state.isISOSymbol);
  const setISOSymbol = useCurrencyStore((state) => state.setISOSymbol);

  return (
    <div className="mt-5 flex items-center space-x-2">
      <Switch
        onCheckedChange={() => setISOSymbol(!isISOSymbol)}
        checked={isISOSymbol}
        id="currency-symbol-switcher"
      />
      <label htmlFor="currency-symbol-switcher">
        {isISOSymbol ? "Disable" : "Enable"} ISO Symbol
      </label>
    </div>
  );
}
