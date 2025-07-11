import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useUpdateUserCurrency } from "@/queries/useUpdateUserCurrency";
import { currencies } from "@/data/currencyLocaleMap";
import { useSession } from "@/context/SessionContext";

const CurrencySwitcher = () => {
  const currencyOptions = useCurrencyStore((state) => state.currencyOptions);
  const { userID } = useSession();
  const { mutate } = useUpdateUserCurrency(userID);
  const setCurrencyOptions = useCurrencyStore(
    (state) => state.setCurrencyOptions,
  );

  const handleValueChange = (value: number) => {
    setCurrencyOptions({
      style: "currency",
      currency: currencyArray[+value].currency,
      country: currencyArray[+value].country,
    });

    mutate({ newCurrency: currencyArray[+value].currency });
  };

  const currencyArray = Object.entries(currencies).map(
    ([currency, country]) => ({
      currency,
      country,
    }),
  );

  return (
    <div className="bg-dark-background/5 mt-5 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
      <div className="min-w-50 flex-1">
        <h1 className="text-[clamp(.9rem,2vw+.9rem,1rem)] font-semibold">
          Preferred Currency
        </h1>
        <p className="text-muted-foreground text-[clamp(.5rem,2vw+.5rem,0.875rem)]">
          Select the currency you want to use for displaying your transactions
          and balances.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Select onValueChange={(value) => handleValueChange(+value)}>
          <SelectTrigger className="ring-dark-background/10 text-dark-txt w-fit rounded-sm p-2 !pl-3 !text-[clamp(.6rem,.5vw+.6rem,1rem)] ring md:rounded-lg md:!p-4">
            <SelectValue placeholder={currencyOptions.currency} />
          </SelectTrigger>
          <SelectContent>
            {currencyArray.map((currency, idx) => (
              <SelectItem
                key={idx}
                className="text-dark-txt p-3"
                value={String(idx)}
              >
                {currency.currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CurrencySwitcher;
