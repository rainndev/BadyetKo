import type { UserSettings } from "@/data/settingsSaveOptions";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";
import { useTransactionListStore } from "@/store/TransactionListStore";
import supabase from "@/supabase/supabase-client";

export const loadSettingsFromSupabase = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("user_settings")
    .eq("id", userId)
    .single();

  if (error) {
    console.warn("⚠️ Failed to load user settings:", error.message);
    return;
  }

  const settings = data.user_settings as  UserSettings;
  if (!settings) return;

  //  Hydrate currency store
  if (settings.currency) {
    useCurrencyStore.setState({
      isMasked: settings.currency.isMasked,
      isISOSymbol: settings.currency.isISOSymbol,
      currencyOptions: settings.currency.currencyOptions,
    });
  }

  //  Hydrate dateTime store
  if (settings.dateTime) {
    useDateTimeStore.setState({
      config: settings.dateTime.config,
      isHour12Enabled: settings.dateTime.isHour12Enabled,
      isSecondEnabled: settings.dateTime.isSecondEnabled,
      isTimezoneEnabled: settings.dateTime.isTimezoneEnabled,
      isTimeAgoEnabled: settings.dateTime.isTimeAgoEnabled,
      isDateToDDMMYYYY: settings.dateTime.isDateToDDMMYYYY,
    });
  }
  
  //  Hydrate transactionList store
  if (settings.transactionList) {
    useTransactionListStore.setState({
      isCategoryLabelEnabled: settings.transactionList.isCategoryLabelEnabled
    });
  }

  

};
