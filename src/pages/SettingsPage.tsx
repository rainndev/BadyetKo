import { useCurrencyStore } from "@/store/CurrencyStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencies } from "@/data/currencyLocaleMap";
import { useSession } from "@/context/SessionContext";
import { useUpdateUserCurrency } from "@/queries/useUpdateUserCurrency";

const SettingsPage = () => {
  const currencyOptions = useCurrencyStore((state) => state.currencyOptions);
  const setCurrencyOptions = useCurrencyStore(
    (state) => state.setCurrencyOptions,
  );
  const { session } = useSession();
  const userID = session?.user.id ?? "";
  const { mutate } = useUpdateUserCurrency(userID);

  const currencyArray = Object.entries(currencies).map(
    ([currency, country]) => ({
      currency,
      country,
    }),
  );

  const hanldeValueChange = (value: number) => {
    setCurrencyOptions({
      style: "currency",
      currency: currencyArray[+value].currency,
      country: currencyArray[+value].country,
    });

    mutate({ newCurrency: currencyArray[+value].currency });
  };

  return (
    <div className="flex h-screen w-full flex-col p-10">
      <h1 className="text-dark-txt my-5 text-[clamp(.7rem,2vw+.7rem,1.5rem)] font-medium">
        Currency
      </h1>
      <div>
        <Select onValueChange={(value) => hanldeValueChange(+value)}>
          <SelectTrigger className="ring-dark-background/10 text-dark-txt/80 w-fit rounded-lg !p-6 !pl-3 !text-[clamp(.6rem,1vw+.6rem,1rem)] ring">
            <SelectValue placeholder={currencyOptions.currency} />
          </SelectTrigger>
          <SelectContent>
            {currencyArray.map((currency, idx) => (
              <SelectItem
                key={idx}
                className="text-dark-txt/80 p-3"
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

export default SettingsPage;
