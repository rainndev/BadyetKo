import supabase from "../supabase/supabase-client";

// Type for each chart data item
export type ChartDataItem = {
  date: string; // YYYY-MM-DD
  withdraw: number;
  deposit: number;
};

export const getChartData = async (): Promise<ChartDataItem[]> => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, created_at, type")
    .gte("created_at", fromDate.toISOString());

  if (error || !data) {
    throw new Error(error?.message || "Failed to fetch transaction data");
  }

  const grouped: Record<string, ChartDataItem> = {};

  data.forEach(
    (tx: { amount: number | string; created_at: string; type: string }) => {
      const date = new Date(tx.created_at).toISOString().split("T")[0]; // e.g. '2025-06-25'
      const amount = Number(tx.amount);

      if (!grouped[date]) {
        grouped[date] = {
          date,
          withdraw: 0,
          deposit: 0,
        };
      }

      if (tx.type === "withdraw") {
        grouped[date].withdraw += amount;
      } else if (tx.type === "deposit") {
        grouped[date].deposit += amount;
      }
    }
  );

  console.log("filtered data", data);

  return Object.values(grouped).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};
