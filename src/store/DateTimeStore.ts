import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DateTimeConfig {
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day: "numeric" | "2-digit";
  hour: "numeric" | "2-digit";
  minute: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  hour12?: boolean;
  timeZoneName?: "short" | "long";
}

interface UseDateTimeStore {
  config: DateTimeConfig;
  getformattedDate: (rawDate: string, country: string) => string;
  isSecondEnabled: boolean;
  isHour12Enabled: boolean;
  isTimezoneEnabled: boolean;
  setSecondEnabled: (isSecondEnabled: boolean) => void;
  setHour12Enabled: (isHour12Enabled: boolean) => void;
  setTimezoneEnabled: (isTimezoneEnabled: boolean) => void;
}

export const useDateTimeStore = create<UseDateTimeStore>()(
  persist(
    (set, get) => ({
      config: {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      },

      isSecondEnabled: false,
      isHour12Enabled: false,
      isTimezoneEnabled: false,

      getformattedDate: (rawDate, country) => {
        const { isHour12Enabled, isSecondEnabled, isTimezoneEnabled, config } =
          get();
        const date = new Date(rawDate);

        let filteredConfig: DateTimeConfig;

        filteredConfig = {
          ...config,
          ...(isSecondEnabled ? { second: "numeric" } : {}),
          ...(isTimezoneEnabled ? { timeZoneName: "short" } : {}),
          hour12: isHour12Enabled,
        };

        return date.toLocaleString(country, filteredConfig);
      },

      setSecondEnabled: (isSecondEnabled) => set({ isSecondEnabled }),
      setHour12Enabled: (isHour12Enabled) => set({ isHour12Enabled }),
      setTimezoneEnabled: (isTimezoneEnabled) => set({ isTimezoneEnabled }),
    }),
    {
      name: "date-store",
    },
  ),
);
