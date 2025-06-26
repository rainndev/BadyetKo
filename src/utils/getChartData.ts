import supabase from "../supabase/supabase-client";

// Type for each chart data item
export type ChartDataItem = {
  date: string; // YYYY-MM-DD
  transaction: number;
};

export const getChartData = async (): Promise<ChartDataItem[]> => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 30);

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, created_at")
    .gte("created_at", fromDate.toISOString());

  if (error || !data) {
    throw new Error(error?.message || "Failed to fetch transaction data");
  }

  const grouped: Record<string, ChartDataItem> = {};

  data.forEach((tx: { amount: number | string; created_at: string }) => {
    const date = new Date(tx.created_at).toISOString().split("T")[0]; // e.g. '2025-06-25'

    if (!grouped[date]) {
      grouped[date] = {
        date,
        transaction: 0,
      };
    }

    grouped[date].transaction += Number(tx.amount);
  });

  return Object.values(grouped).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};
