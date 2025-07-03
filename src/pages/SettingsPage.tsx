import { useCurrencyStore } from "@/store/CurrencyStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencies = [
  { country: "en-PH", currency: "PHP" }, // Philippine Peso
  { country: "en-US", currency: "USD" }, // US Dollar
  { country: "en-GB", currency: "GBP" }, // British Pound
  { country: "ja-JP", currency: "JPY" }, // Japanese Yen
  { country: "zh-CN", currency: "CNY" }, // Chinese Yuan
  { country: "ko-KR", currency: "KRW" }, // South Korean Won
  { country: "de-DE", currency: "EUR" }, // Euro (Germany)
  { country: "fr-FR", currency: "EUR" }, // Euro (France)
  { country: "en-CA", currency: "CAD" }, // Canadian Dollar
  { country: "en-AU", currency: "AUD" }, // Australian Dollar
  { country: "en-IN", currency: "INR" }, // Indian Rupee
  { country: "th-TH", currency: "THB" }, // Thai Baht
  { country: "id-ID", currency: "IDR" }, // Indonesian Rupiah
  { country: "ru-RU", currency: "RUB" }, // Russian Ruble
  { country: "ar-SA", currency: "SAR" }, // Saudi Riyal
  { country: "ms-MY", currency: "MYR" }, // Malaysian Ringgit
  { country: "vi-VN", currency: "VND" }, // Vietnamese Dong
  { country: "en-NG", currency: "NGN" }, // Nigerian Naira
  { country: "pt-BR", currency: "BRL" }, // Brazilian Real
];

const SettingsPage = () => {
  const setCurrencyOption = useCurrencyStore(
    (state) => state.setCurrencyOptions,
  );

  const currencyOptions = useCurrencyStore((state) => state.currencyOptions);

  console.log("Current Options", currencyOptions);
  return (
    <div className="flex h-screen w-full flex-col p-10">
      <h1 className="text-dark-txt my-5 text-[clamp(.7rem,2vw+.7rem,1.5rem)] font-medium">
        Currency
      </h1>
      <div>
        <Select
          onValueChange={(value) =>
            setCurrencyOption({
              ...currencies[+value],
              style: "currency",
            })
          }
        >
          <SelectTrigger className="ring-dark-background/10 text-dark-txt/80 w-fit rounded-lg !p-6 !pl-3 !text-[clamp(.6rem,1vw+.6rem,1rem)] ring">
            <SelectValue placeholder={currencyOptions.currency} />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency, idx) => (
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
