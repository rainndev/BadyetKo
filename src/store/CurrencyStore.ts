import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatMoney, maskNumber } from "@/utils/helper";

type currencyOptionsType = {
  country: string;
  style: "decimal" | "currency" | "percent";
  currency: string;
};

type useCurrencyStoreType = {
  currencyOptions: currencyOptionsType;
  isMasked: boolean;
  setCurrencyOptions: (newOptions: currencyOptionsType) => void;
  getformattedAmount: (amount: number) => string;
  setMasked: (option: boolean) => void;
};

export const useCurrencyStore = create<useCurrencyStoreType>()(
  persist(
    (set, get) => ({
      currencyOptions: {
        country: "en-PH",
        style: "currency",
        currency: "PHP",
      },

      isMasked: false,

      setCurrencyOptions: (newOptions) =>
        set((state) => ({
          currencyOptions: {
            ...state.currencyOptions,
            ...newOptions,
          },
        })),

      setMasked: (option) => set(() => ({ isMasked: option })),

      getformattedAmount: (amount) => {
        const formatted = formatMoney(
          amount,
          get().currencyOptions.country,
          get().currencyOptions.style,
          get().currencyOptions.currency,
        );

        return get().isMasked ? maskNumber(formatted) : formatted;
      },
    }),
    {
      name: "currency-options",
    },
  ),
);
