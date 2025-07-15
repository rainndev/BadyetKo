import { Cell, Pie, PieChart } from "recharts";
import { hexToRgba } from "@/utils/helper";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartPieDonutData = {
  category_name: string;
  net_balance: number;
  color: string;
};
type ChartPieDonutProps = { chartData: ChartPieDonutData[] };

const ChartPieDonut = ({ chartData }: ChartPieDonutProps) => {
  const chartConfig = Object.fromEntries(
    chartData.map((item) => [
      item.category_name.toLowerCase().replace(/\s+/g, "_"), // key
      {
        label: item.category_name,
        color: item.color || "var(--color-gray-400)", // fallback if null
      },
    ]),
  ) satisfies ChartConfig;

  return (
    <Card className="border-dark-background/20 flex flex-col p-2 md:p-10">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category-wise Net Balances</CardTitle>
        <CardDescription>
          Summary of deposits and withdrawals grouped by category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="net_balance"
              nameKey="category_name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || "#f26f6f"} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-2 text-sm tabular-nums">
        {chartData.map(({ category_name, color }) => (
          <div
            style={{
              backgroundColor: hexToRgba(color || "#f26f6f", 30),
              border: "1px solid",
              borderColor: color || "#f26f6f",
            }}
            className="flex w-fit items-center gap-2 rounded-full p-2 px-4 text-[clamp(.5rem,1vw+.5rem,.85rem)] leading-none font-medium"
          >
            <span className="text-dark-txt/90 text-nowrap">
              {category_name}
            </span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ChartPieDonut;
