export interface DateTimeConfig {
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day: "numeric" | "2-digit";
  hour: "numeric" | "2-digit";
  minute: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  hour12?: boolean;
  timeZoneName?: "short" | "long";
}

export interface UseDateTimeStore {
  config: DateTimeConfig;
  isSecondEnabled: boolean;
  isHour12Enabled: boolean;
  isTimezoneEnabled: boolean;
  isTimeAgoEnabled: boolean;
  isDateToDDMMYYYY: boolean;
  setDateToDDMMYYYY: (isDateToDDMMYYYY: boolean) => void;
  getformattedDate: (rawDate: string, country: string) => string;
  setTimeAgoEnabled: (isTimeAgoEnabled: boolean) => void;
  setSecondEnabled: (isSecondEnabled: boolean) => void;
  setHour12Enabled: (isHour12Enabled: boolean) => void;
  setTimezoneEnabled: (isTimezoneEnabled: boolean) => void;
}
