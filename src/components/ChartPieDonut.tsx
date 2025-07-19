import { Cell, Pie, PieChart } from "recharts";
import { hexToRgba } from "@/utils/helper";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
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
import { useCategoryPieData } from "@/queries/useCategoryPieData";

const ChartPieDonut = () => {
  const { data, isLoading, isError } = useCategoryPieData();

  const chartConfig = Object.fromEntries(
    (data || []).map((item) => [
      item.category_name.toLowerCase().replace(/\s+/g, "_"), // key
      {
        label: item.category_name,
        color: item.color || "var(--color-gray-400)", // fallback if null
      },
    ]),
  ) satisfies ChartConfig;

  const isChartDataEmpty = !data || data.length === 0;
  return (
    <Card className="border-dark-background/20 mt-5 flex flex-col p-2 pt-10 md:m-0 md:p-10">
      <CardHeader className="items-center pb-0">
        <CardTitle>Where Did Your Money Go?</CardTitle>
        <CardDescription>
          A breakdown of your deposits and withdrawals by category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {/* loading placeholder chart */}
        {isLoading && (
          <div className="flex w-full items-center justify-center">
            <div className="bg-dark-background/50 m-5 size-50 animate-pulse rounded-full" />
          </div>
        )}
        {/* show this when error or no tx made yet */}
        {((isChartDataEmpty && !isLoading) || isError) && (
          <div className="text-dark-txt/70 flex aspect-auto h-full w-full items-center justify-center gap-2">
            <PiEmptyThin className="text-xl" />
            <p className="text-fluid-sm">
              {isError
                ? "Something went wrong."
                : "You currently have no transactions."}
            </p>
          </div>
        )}

        {/* actual pie chart with data */}
        {!isLoading && !isError && (
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
                data={data}
                dataKey="net_balance"
                nameKey="category_name"
                innerRadius={60}
                strokeWidth={5}
              >
                {(data ?? []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#f26f6f"} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <motion.div
        layout
        className="flex flex-wrap justify-center gap-2 text-sm tabular-nums"
      >
        {isLoading && <ChartPieDonutPlaceholder />}

        {!isLoading &&
          !isChartDataEmpty &&
          !isError &&
          data.map(({ category_name, color }, idx) => (
            <div
              key={category_name + idx}
              style={{
                backgroundColor: hexToRgba(color || "#f26f6f", 30),
                border: "1px solid",
                borderColor: color || "#f26f6f",
              }}
              className="text-fluid-xs flex w-fit items-center gap-2 rounded-full p-2 px-4 leading-none font-medium"
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
