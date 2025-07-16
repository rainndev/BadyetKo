import { Cell, Pie, PieChart } from "recharts";
import { hexToRgba } from "@/utils/helper";
import { motion } from "framer-motion";

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
import ChartPieDonutPlaceholder from "./ChartPieDonutPlaceholder";
import { PiEmptyThin } from "react-icons/pi";

type ChartPieDonutData = {
  category_name: string;
  net_balance: number;
  color: string;
};
type ChartPieDonutProps = {
  chartData: ChartPieDonutData[];
  isLoadingUserStatistic: boolean;
};

const ChartPieDonut = ({
  chartData,
  isLoadingUserStatistic,
}: ChartPieDonutProps) => {
  const chartConfig = Object.fromEntries(
    chartData.map((item) => [
      item.category_name.toLowerCase().replace(/\s+/g, "_"), // key
      {
        label: item.category_name,
        color: item.color || "var(--color-gray-400)", // fallback if null
      },
    ]),
  ) satisfies ChartConfig;

  const isChartDataEmpty = !chartData || chartData.length === 0;

  return (
    <Card className="border-dark-background/20 mt-5 flex flex-col p-2 pt-10 md:m-0 md:p-10">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category-wise Net Balances</CardTitle>
        <CardDescription>
          Summary of deposits and withdrawals grouped by category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isChartDataEmpty && (
          <div className="text-dark-txt/70 gap-2text-dark-txt/70 flex aspect-auto h-full w-full items-center justify-center gap-2">
            <PiEmptyThin className="text-xl" />
            <p className="text-[clamp(.4rem,2vw+.4rem,.9rem)]">
              You currently have no transactions.
            </p>
          </div>
        )}
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
      <motion.div
        layout
        className="flex flex-wrap justify-center gap-2 text-sm tabular-nums"
      >
        {isLoadingUserStatistic && <ChartPieDonutPlaceholder />}

        {chartData.map(({ category_name, color }, idx) => (
          <div
            key={category_name + idx}
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
      </motion.div>
    </Card>
  );
};

export default ChartPieDonut;
