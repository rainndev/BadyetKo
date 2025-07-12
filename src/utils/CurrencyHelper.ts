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
