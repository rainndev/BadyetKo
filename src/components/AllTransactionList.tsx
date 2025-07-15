import { useTransactionList } from "@/queries/useTransactionList";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";
import { useTransactionListStore } from "@/store/TransactionListStore";
import { hexToRgba } from "@/utils/helper";
import TransactionListPlaceholder from "./TransactionListPlaceholder";

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
    <div className="border-dark-background/20 min-h-100 w-full rounded-3xl p-2 md:border md:p-10">
      <h1 className="text-dark-txt mb-5 text-[clamp(.7rem,2vw+.7rem,1.25rem)] font-medium">
        Recent Transactions
      </h1>

      <div className="hide-scrollbar h-full overflow-x-auto">
        {isTXlistEmpty && !isLoading && (
          <p className="text-dark-txt/70 text-[clamp(.5rem,2vw+.5rem,.9rem)]">
            You currently have no transactions.
          </p>
        )}

        <div className="flex w-full flex-col gap-3 divide-y divide-gray-100">
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
                          <h1 className="max-w-[10rem] truncate text-[clamp(.6rem,1vw+.6rem,.9rem)] text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
                            {name}
                          </h1>
                        </div>

                        {/* tx note */}
                        <p className="text-dark-txt/50 w-fit max-w-[10rem] truncate text-[clamp(.6rem,1vw+.6rem,0.85rem)] text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
                          {note || "n/a"}
                        </p>
                      </div>
                    </div>

                    {/* tx type */}
                    <div className="mt-1 flex items-center gap-2 text-[clamp(.5rem,1vw+.5rem,0.75rem)]">
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
                      className={`text-center text-[clamp(.6rem,1vw+.6rem,.9rem)] text-nowrap tabular-nums ${isDeposit ? "text-[#477d59]" : "text-[#ad383a]"} `}
                    >
                      {(isDeposit ? "+" : "-") + getformattedAmount(amount)}
                    </p>
                    <p className="text-dark-txt/50 text-[clamp(.5rem,1vw+.5rem,0.80rem)] font-medium">
                      {getformattedDate(created_at, country)}
                    </p>
                  </div>
                </div>
              );
            },

            // <tr
            //   key={data.id}
            //   className="hover:bg-dark-background/10 bg-dark-background/3 w-full transition-colors ease-in-out"
            // >
            //   {/* tx date */}
            //   <td className="text-dark-txt/70 rounded-l-2xl p-5 pl-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)] font-semibold text-nowrap">
            //     {getformattedDate(data.created_at, country)}
            //     <p className="text-dark-txt/50 text-[clamp(.6rem,2vw+.6rem,0.75rem)]">
            //       Date
            //     </p>
            //   </td>

            //   {/* tx name */}
            //   <td className="max-w-[10rem] truncate p-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)] text-gray-600">
            //     {data.name}
            //     <p className="text-dark-txt/50 w-fit rounded-lg text-[clamp(.6rem,2vw+.6rem,0.75rem)]">
            //       name
            //     </p>
            //   </td>

            //   {/* tx amount */}
            //   <td
            //     className={`p-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)] font-semibold ${data.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"}`}
            //   >
            //     <p className="text-nowrap tabular-nums">
            //       {(data.type === "deposit" ? "+" : "-") +
            //         getformattedAmount(data.amount)}
            //     </p>
            //   </td>

            //   {/* tx type */}
            //   <td className="rounded-r-2xl">
            //     <div className="flex items-center justify-start p-5 pr-2 text-[clamp(.5rem,1vw+.5rem,0.75rem)] text-gray-600">
            //       <span className="relative flex size-3 items-center justify-center">
            //         <span
            //           className={`${data.type === "deposit" ? "bg-green-300" : "bg-red-300"} absolute inline-flex h-full w-full animate-ping rounded-full opacity-75`}
            //         />
            //         <span
            //           className={`${data.type === "deposit" ? "bg-green-600" : "bg-red-500"} relative inline-flex size-2 rounded-full`}
            //         ></span>
            //       </span>

            //       <p
            //         className={`w-fit rounded-full px-3 py-1 font-medium first-letter:capitalize ${data.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"}`}
            //       >
            //         {data.type}
            //       </p>
            //     </div>
            //   </td>
            // </tr>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTransactionList;
