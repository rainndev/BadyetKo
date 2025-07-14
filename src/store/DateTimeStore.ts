import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formattDate, timeAgo, formatDateToDDMMYYYY } from "@/utils/DateTimeHelper";
import type { DateTimeConfig, UseDateTimeStore } from "@/types/dateTime.types";

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
      isTimeAgoEnabled: false,
      isDateToDDMMYYYY: true,

      getformattedDate: (rawDate, country) => {
        const {
          isHour12Enabled,
          isSecondEnabled,
          isTimezoneEnabled,
          isDateToDDMMYYYY,
          config,
          isTimeAgoEnabled,
        } = get();

        let filteredConfig: DateTimeConfig;

        filteredConfig = {
          ...config,
          ...(isSecondEnabled ? { second: "numeric" } : {}),
          ...(isTimezoneEnabled ? { timeZoneName: "short" } : {}),
          hour12: isHour12Enabled,
        };

        if (isTimeAgoEnabled) return timeAgo(rawDate)
        if (isDateToDDMMYYYY) return formatDateToDDMMYYYY(rawDate, country)  

        return formattDate(rawDate, country, filteredConfig);
      },

      setSecondEnabled: (isSecondEnabled) => set({ isSecondEnabled }),
      setHour12Enabled: (isHour12Enabled) => set({ isHour12Enabled }),
      setTimezoneEnabled: (isTimezoneEnabled) => set({ isTimezoneEnabled }),
      setTimeAgoEnabled: (isTimeAgoEnabled) => set({ isTimeAgoEnabled }),
      setDateToDDMMYYYY: (isDateToDDMMYYYY) => set({ isDateToDDMMYYYY }),
    }),
    {
      name: "date-store",
    },
  ),
);
