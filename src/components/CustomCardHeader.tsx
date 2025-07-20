import { useEffect, useState } from "react";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useSpendingTip } from "@/hooks/useSpendingTips";
import { useCategoryPieData } from "@/queries/useCategoryPieData";
import type { ChartPieDonutData } from "@/api/user";
import { hexToRgba } from "@/utils/helper";

const CustomCardHeader = () => {
  const { data, isLoading } = useCategoryPieData();
  const [mostSpendCategory, setMostSpendCategory] =
    useState<ChartPieDonutData | null>();

  const isDataEmpty = !data || data.length === 0;

  useEffect(() => {
    if (isDataEmpty) return;

    const maxCategory = data.reduce((max, item) =>
      item.net_balance > max.net_balance ? item : max,
    );

    setMostSpendCategory(maxCategory);
  }, [data]);

  const rawTip = useSpendingTip(mostSpendCategory?.category_name ?? "");
  // Split the string to style only <category>
  const parts = rawTip.split(mostSpendCategory?.category_name ?? "");

  if (isLoading) {
    return (
      <CardHeader className="bg-dark-background/50 animate-pulse items-center rounded-lg pb-0">
        <CardTitle className="invisible">Saan ka na naman gumastos?</CardTitle>
        <CardDescription className="invisible">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </CardDescription>
      </CardHeader>
    );
  }

  return (
    <CardHeader className="items-center pb-0">
      <CardTitle>Saan ka na naman gumastos?</CardTitle>
      <CardDescription className="mt-2">
        <p className="text-fluid-base items-center leading-relaxed">
          {parts[0]}
          <span
            key={mostSpendCategory?.category_name}
            style={{
              backgroundColor: hexToRgba(
                mostSpendCategory?.color || "#f26f6f",
                30,
              ),
              border: "1px solid",
              borderColor: mostSpendCategory?.color || "#f26f6f",
            }}
            className="text-fluid-xs mx-1 inline-flex items-center gap-2 rounded-full px-4 py-0.5 font-medium"
          >
            <span className="text-dark-txt/90 text-nowrap">
              {mostSpendCategory?.category_name}
            </span>
          </span>

          {parts[1]}
        </p>
      </CardDescription>
    </CardHeader>
  );
};

export default CustomCardHeader;
