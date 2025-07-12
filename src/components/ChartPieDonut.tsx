import { Label, Pie, PieChart } from "recharts";

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

type ChartPieDonutData = { type: string; amount: number; fill: string };
type ChartPieDonutProps = { chartData: ChartPieDonutData[] };

const ChartPieDonut = ({ chartData }: ChartPieDonutProps) => {
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  return (
    <Card className="border-dark-background/20 flex flex-col p-5 md:p-10">
      <CardHeader className="items-center pb-0">
        <CardTitle>All-Time Transaction Breakdown</CardTitle>
        <CardDescription>
          Total deposits and withdrawals since account creation
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
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold text-red-400"
                        >
                          test
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="text-black"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm tabular-nums">
        <div className="flex w-full items-center justify-between gap-2 leading-none font-medium">
          <div className="flex gap-2">
            <span className="size-3 rounded-xs bg-amber-300" />
            <span>Total Deposited</span>
          </div>
          <p>{getformattedAmount(chartData[0].amount)}</p>
        </div>

        <div className="flex w-full items-center justify-between gap-2 leading-none font-medium">
          <div className="flex gap-2">
            <span className="size-3 rounded-xs bg-red-300" />
            <span>Total Withdrawn</span>
          </div>
          <p>{getformattedAmount(chartData[1].amount)}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartPieDonut;
