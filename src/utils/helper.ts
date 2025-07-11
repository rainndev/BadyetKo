export const isValidUUIDv4 = (id?: string) => {
  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return id && id !== null && uuidv4Regex.test(id);
};

export const maskNumber = (value: number | string): string => {
  return value.toString().replace(/\d/g, "*");
};

export const formatMoney = (
  amount: number,
  country: string,
  style: "decimal" | "currency" | "percent",
  currency: string,
) => {
  const formatter = new Intl.NumberFormat(country, {
    style,
    currency,
  });
  return formatter.format(amount);
};
