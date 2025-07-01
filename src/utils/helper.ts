export const isValidUUIDv4 = (id?: string) => {
  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return id && id !== null && uuidv4Regex.test(id);
};

export const getReadableDate = (rawDate: string): string => {
  const date = new Date(rawDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // e.g. June
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    // timeZoneName: "short", // e.g. GMT+8
  };

  return date.toLocaleString("en-US", options);
};
