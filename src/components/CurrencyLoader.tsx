import { useSession } from "@/context/SessionContext";
import { currencies } from "@/data/currencyLocaleMap";
import { useUserCurrency } from "@/queries/useUserCurrency";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useEffect } from "react";

const CurrencyLoader = () => {
  const { session } = useSession();
  const userID = session?.user.id ?? "";

  const setCurrencyOptions = useCurrencyStore(
    (state) => state.setCurrencyOptions,
  );

  const { data } = useUserCurrency(userID);

  useEffect(() => {
    if (!data) return;

    console.log(
      "use effect executed..",
      useCurrencyStore.getState().currencyOptions.currency,
    );

    const country = currencies[data] || "en-PH";
    const currency = data;

    setCurrencyOptions({
      country,
      style: "currency",
      currency,
    });
  }, [data, setCurrencyOptions]);

  return null;
};

export default CurrencyLoader;
