"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { PiEmptyThin } from "react-icons/pi";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getChartData } from "@/utils/getChartData";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  deposit: {
    label: "Deposit",
    color: "var(--chart-1)",
  },
  withdraw: {
    label: "Withdraw",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function AreaChartData() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const { data } = useQuery({
    queryKey: ["area-chart-data"],
    queryFn: getChartData,
    staleTime: 10 * 60 * 1000, // 10 minutes in milliseconds
    refetchOnWindowFocus: false,
  });

  // Filter based on selected time range
  const filteredData = data?.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(referenceDate.getDate() - daysToSubtract);

    return date >= startDate;
  });

  const isTransactionEmpty = !data || data.length === 0;

  return (
    <Card className="p-2 md:p-10 lg:border">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Transaction Overview</CardTitle>
          <CardDescription>
            Visualizing total transaction volume over the selected time range.
          </CardDescription>
        </div>
        <Select
          disabled={isTransactionEmpty}
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isTransactionEmpty && (
          <div className="text-dark-txt/70 flex aspect-auto h-[250px] w-full items-center justify-center gap-2">
            <PiEmptyThin className="text-xl" />
            <p className="text-fluid-sm">You currently have no transactions.</p>
          </div>
        )}

        {!isTransactionEmpty && (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillDeposit" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-amber-300)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-amber-300)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillWithdraw" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-red-300)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-red-300)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="line"
                  />
                }
              />

              <Area
                dataKey="deposit"
                type="monotone"
                fill="url(#fillDeposit)"
                stroke="var(--color-amber-300)"
                stackId="a"
              />

              <Area
                dataKey="withdraw"
                type="monotone"
                fill="url(#fillWithdraw)"
                stroke="var(--color-red-300)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default AreaChartData;
