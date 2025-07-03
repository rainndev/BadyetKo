import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatMoney } from "@/utils/helper";

type optionsType = {
  country: string;
  style: "decimal" | "currency" | "percent";
  currency: string;
};

type useCurrencyStoreType = {
  currencyOptions: optionsType;
  setCurrencyOptions: (newOptions: optionsType) => void;
  getformattedAmount: (amount: number) => string;
};

export const useCurrencyStore = create<useCurrencyStoreType>()(
  persist(
    (set, get) => ({
      currencyOptions: {
        country: "en-PH",
        style: "currency",
        currency: "PHP",
      },

      setCurrencyOptions: (newOptions) =>
        set((state) => ({
          currencyOptions: {
            ...state.currencyOptions,
            ...newOptions,
          },
        })),

      getformattedAmount: (amount) =>
        formatMoney(
          amount,
          get().currencyOptions.country,
          get().currencyOptions.style,
          get().currencyOptions.currency,
        ),
    }),
    {
      name: "currency-options",
    },
  ),
);
