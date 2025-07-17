import { useTransactionList } from "@/queries/useTransactionList";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";
import { useTransactionListStore } from "@/store/TransactionListStore";
import { hexToRgba } from "@/utils/helper";
import TransactionListPlaceholder from "./TransactionListPlaceholder";
import { PiEmptyThin } from "react-icons/pi";

const AllTransactionList = () => {
  const { data, isLoading } = useTransactionList();
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const country = useCurrencyStore((state) => state.currencyOptions.country);
  const getformattedDate = useDateTimeStore((state) => state.getformattedDate);
  const isCategoryLabelEnabled = useTransactionListStore(
    (state) => state.isCategoryLabelEnabled,
  );

  const isTXlistEmpty = !(
    Array.isArray(data?.transactions) && data.transactions.length > 0
  );

  return (
    <div className="border-dark-background/20 min-h-100 w-full rounded-3xl p-2 py-5 md:p-10 lg:border">
      <h1 className="text-dark-txt text-fluid-xl mb-5 font-semibold">
        Recent Transactions
      </h1>

      <div className="hide-scrollbar h-full overflow-x-auto">
        {isTXlistEmpty && !isLoading && (
          <div className="text-dark-txt/70 gap-2text-dark-txt/70 flex aspect-auto min-h-100 w-full items-center justify-center gap-2">
            <PiEmptyThin className="text-xl" />
            <p className="text-fluid-sm">You currently have no transactions.</p>
          </div>
        )}

        <div className="flex w-full flex-col gap-3 divide-y divide-gray-200">
          {isLoading &&
            [...Array(5)].map((_, idx) => (
              <TransactionListPlaceholder
                key={"transaction-all-list-placeholder" + idx}
              />
            ))}

          {data?.transactions.map(
            ({ name, note, type, created_at, amount, categories, id }) => {
              const isDeposit = type === "deposit";
              return (
                <div
                  key={id}
                  className="flex w-full justify-between py-2 transition-colors ease-in-out"
                >
                  <div className="flex flex-col">
                    <div className="flex w-full items-center justify-between">
                      <div>
                        {/* tx name */}
                        <div className="flex items-center justify-start gap-2">
                          <h1 className="text-fluid-base max-w-[10rem] truncate text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
                            {name}
                          </h1>
                        </div>

                        {/* tx note */}
                        <p className="text-dark-txt/50 text-fluid-sm w-fit max-w-[10rem] truncate text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
                          {note || "n/a"}
                        </p>
                      </div>
                    </div>

                    {/* tx type */}
                    <div className="text-fluid-xs mt-1 flex items-center gap-2">
                      {isCategoryLabelEnabled ? (
                        <div
                          style={{
                            backgroundColor: hexToRgba(
                              categories?.color || "#f26f6f",
                              30,
                            ),
                            border: "1px solid",
                            borderColor: categories?.color || "#f26f6f",
                          }}
                          className={`flex items-center justify-center rounded-2xl border px-2`}
                        >
                          <p
                            className={`text-dark-txt/80 w-fit max-w-[5rem] truncate rounded-full px-1 py-0.5 text-center font-medium first-letter:capitalize sm:max-w-[10rem] md:px-2`}
                          >
                            {categories?.name || "Uncategorized"}
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`flex border ${isDeposit ? "border-green-200 bg-green-100" : "border-red-200 bg-red-100"} items-center justify-center rounded-2xl px-2`}
                        >
                          <p
                            className={`w-fit rounded-full px-1 py-0.5 font-medium first-letter:capitalize md:px-2 ${isDeposit ? "text-[#477d59]" : "text-[#ad383a]"} text-center`}
                          >
                            {type}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* tx amount */}
                  <div
                    className={`flex flex-col items-end justify-center font-semibold`}
                  >
                    <p
                      className={`text-fluid-base text-center text-nowrap tabular-nums ${isDeposit ? "text-[#477d59]" : "text-[#ad383a]"} `}
                    >
                      {(isDeposit ? "+" : "-") + getformattedAmount(amount)}
                    </p>
                    <p className="text-dark-txt/50 text-fluid-xs font-medium">
                      {getformattedDate(created_at, country)}
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTransactionList;
