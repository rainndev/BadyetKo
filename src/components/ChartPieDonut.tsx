import { Pie, PieChart } from "recharts";

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
import { useCurrencyStore } from "@/store/CurrencyStore";

const chartConfig = {
  deposit: {
    label: "Total Deposited",
    color: "var(--color-amber-300)",
  },
  withdraw: {
    label: "Total Withdrawn",
    color: "var(--color-red-300)",
  },
} satisfies ChartConfig;

type ChartPieDonutData = {
  category_name: string;
  net_balance: number;
  fill: string;
};
type ChartPieDonutProps = { chartData: ChartPieDonutData[] };

const ChartPieDonut = ({ chartData }: ChartPieDonutProps) => {
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  return (
    <Card className="border-dark-background/20 flex flex-col p-5 md:p-10">
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
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 text-sm tabular-nums">
        {chartData.map(({ category_name, net_balance, fill }) => (
          <div
            style={{ backgroundColor: fill }}
            className="flex w-fit items-center gap-2 rounded-full p-2 text-[clamp(.5rem,1vw+.5rem,.85rem)] leading-none font-medium"
          >
            <span className="text-nowrap">{category_name}</span>
            <p>{getformattedAmount(net_balance)}</p>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ChartPieDonut;
