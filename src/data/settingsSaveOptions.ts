import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";
import { useTransactionListStore } from "@/store/TransactionListStore";

export type UserSettings = {
  currency: {
    currencyOptions: ReturnType<typeof useCurrencyStore.getState>['currencyOptions'];
    isMasked: boolean;
    isISOSymbol: boolean;
  };
  dateTime: {
    config: ReturnType<typeof useDateTimeStore.getState>['config'];
    isSecondEnabled: boolean;
    isHour12Enabled: boolean;
    isTimezoneEnabled: boolean;
    isTimeAgoEnabled: boolean;
    isDateToDDMMYYYY: boolean;
  };
  transactionList: {
    isCategoryLabelEnabled: boolean; 
  };
};


export const user_settings : UserSettings = {
      currency: {
        currencyOptions: useCurrencyStore.getState().currencyOptions,
        isMasked: useCurrencyStore.getState().isMasked,
        isISOSymbol: useCurrencyStore.getState().isISOSymbol,
      },
      dateTime: {
        config: useDateTimeStore.getState().config,
        isSecondEnabled: useDateTimeStore.getState().isSecondEnabled,
        isHour12Enabled: useDateTimeStore.getState().isHour12Enabled,
        isTimezoneEnabled: useDateTimeStore.getState().isTimezoneEnabled,
        isTimeAgoEnabled: useDateTimeStore.getState().isTimeAgoEnabled,
        isDateToDDMMYYYY: useDateTimeStore.getState().isDateToDDMMYYYY,
      },
      transactionList: {
        isCategoryLabelEnabled:
          useTransactionListStore.getState().isCategoryLabelEnabled,
      },
};