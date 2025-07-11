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
  isISOSymbol: boolean;
  setCurrencyOptions: (newOptions: currencyOptionsType) => void;
  setMasked: (option: boolean) => void;
  setISOSymbol: (option: boolean) => void;
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
      isISOSymbol: false,
      isMasked: false,

      setCurrencyOptions: (newOptions) =>
        set((state) => ({
          currencyOptions: {
            ...state.currencyOptions,
            ...newOptions,
          },
        })),

      setMasked: (option) => set(() => ({ isMasked: option })),
      setISOSymbol: (option) => set(() => ({ isISOSymbol: option })),

      getformattedAmount: (amount) => {
        const { country, currency, style } = get().currencyOptions;
        const { isMasked, isISOSymbol } = get();

        let formatted: string;

        if (isISOSymbol) {
          formatted = `${currency} ${amount.toLocaleString(country, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        } else {
          formatted = formatMoney(amount, country, style, currency);
        }

        return isMasked ? maskNumber(formatted) : formatted;
      },
    }),
    {
      name: "currency-store",
    },
  ),
);
