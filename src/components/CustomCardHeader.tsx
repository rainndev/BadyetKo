import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useSpendingTip } from "@/hooks/useSpendingTips";
import type { ChartPieDonutData } from "@/api/user";
import { hexToRgba } from "@/utils/helper";
import { useCurrencyStore } from "@/store/CurrencyStore";

type CustomCardHeaderProps = {
  topCategory?: ChartPieDonutData;
  isLoading: boolean;
};

const CustomCardHeader = ({
  topCategory,
  isLoading,
}: CustomCardHeaderProps) => {
  const mostSpendCategory = topCategory;
  const isPH =
    useCurrencyStore((state) => state.currencyOptions.currency) === "PHP";

  const rawTip = useSpendingTip(mostSpendCategory?.category_name ?? "");
  // Split the string to style only <category>
  const parts = rawTip.split(mostSpendCategory?.category_name ?? "");

  if (isLoading) {
    return (
      <CardHeader className="bg-dark-background/50 -mx-2 animate-pulse items-center rounded-lg pb-0 md:mx-0">
        <CardTitle className="invisible">Saan ka na naman gumastos?</CardTitle>
        <CardDescription className="invisible">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </CardDescription>
      </CardHeader>
    );
  }

  return (
    <CardHeader className="mt-5 items-center pb-0 lg:mt-0">
      <CardTitle>
        {isPH ? "Saan Napunta ang Pera Mo?" : "Where Did Your Money Go?"}
      </CardTitle>
      {isPH ? (
        <CardDescription>
          {(!mostSpendCategory ||
            mostSpendCategory?.category_name === "Uncategorized") && (
            <p>
              Wala pa kaming maipakitang datos. Simulan mo nang i-track ang
              iyong pera ngayon!
            </p>
          )}

          {mostSpendCategory &&
            mostSpendCategory.category_name !== "Uncategorized" && (
              <p className="text-fluid-sm items-center leading-relaxed">
                {parts[0]}
                <span
                  key={mostSpendCategory.category_name}
                  style={{
                    backgroundColor: hexToRgba(
                      mostSpendCategory.color || "#f26f6f",
                      30,
                    ),
                    border: "1px solid",
                    borderColor: mostSpendCategory.color || "#f26f6f",
                  }}
                  className="text-fluid-xs mx-1 inline-flex items-center gap-2 rounded-sm px-2 font-medium"
                >
                  <span className="text-dark-txt/90 text-nowrap">
                    {mostSpendCategory.category_name}
                  </span>
                </span>

                {parts[1]}
              </p>
            )}
        </CardDescription>
      ) : (
        <CardDescription>
          A breakdown of your deposits and withdrawals by category
        </CardDescription>
      )}
    </CardHeader>
  );
};

export default CustomCardHeader;
