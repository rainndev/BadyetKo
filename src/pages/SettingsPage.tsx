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
  const setMaskNumber = useCurrencyStore((state) => state.setMasked);
  const isMasked = useCurrencyStore((state) => state.isMasked);

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
    <div className="flex h-screen w-full flex-col gap-10 p-10">
      {/* currency changer */}
      <div>
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.5rem)] font-medium">
          Currency
        </h1>
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

      {/* hide transaction */}

      <div>
        <h1 className="text-dark-txt mb-2 text-[clamp(.7rem,2vw+.7rem,1.5rem)] font-medium">
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
