import { useTransactionList } from "@/queries/useTransactionList";
import LoadingPulse from "./LoadingPulse";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";

const AllTransactionList = () => {
  const { data, isLoading } = useTransactionList();
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const country = useCurrencyStore((state) => state.currencyOptions.country);
  const getformattedDate = useDateTimeStore((state) => state.getformattedDate);

  const isTXlistEmpty = !(
    Array.isArray(data?.transactions) && data.transactions.length > 0
  );

  return (
    <div className="border-dark-background/20 min-h-100 w-full rounded-3xl border p-5 md:p-10">
      <h1 className="text-dark-txt mb-5 text-[clamp(.6rem,2vw+.6rem,1.25rem)] font-medium">
        Recent Transactions
      </h1>

      <div className="hide-scrollbar h-full overflow-x-auto">
        {isLoading ? (
          <LoadingPulse />
        ) : isTXlistEmpty ? (
          <p className="text-dark-txt/70 text-[clamp(.5rem,2vw+.5rem,.9rem)]">
            You currently have no transactions.
          </p>
        ) : (
          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              {data?.transactions.map((data) => (
                <tr
                  key={data.id}
                  className="hover:bg-dark-background/10 bg-dark-background/3 w-full transition-colors ease-in-out"
                >
                  <td className="text-dark-txt/70 rounded-l-2xl p-5 pl-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)] font-semibold text-nowrap">
                    {getformattedDate(data.created_at, country)}
                    <p className="text-dark-txt/50 text-[clamp(.6rem,2vw+.6rem,0.75rem)]">
                      Date
                    </p>
                  </td>
                  <td className="max-w-xs truncate p-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)] text-gray-600">
                    {data.name}
                    <p className="text-dark-txt/50 w-fit rounded-lg text-[clamp(.6rem,2vw+.6rem,0.75rem)]">
                      name
                    </p>
                  </td>
                  <td
                    className={`p-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)] font-semibold ${data.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"}`}
                  >
                    <p className="text-nowrap tabular-nums">
                      {(data.type === "deposit" ? "+" : "-") +
                        getformattedAmount(data.amount)}
                    </p>
                  </td>
                  <td className="rounded-r-2xl">
                    <div className="flex items-center justify-start p-5 pr-2 text-[clamp(.4rem,1vw+.4rem,0.75rem)] text-gray-600">
                      <span className="relative flex size-3 items-center justify-center">
                        <span
                          className={`${data.type === "deposit" ? "bg-green-300" : "bg-red-300"} absolute inline-flex h-full w-full animate-ping rounded-full opacity-75`}
                        />
                        <span
                          className={`${data.type === "deposit" ? "bg-green-600" : "bg-red-500"} relative inline-flex size-2 rounded-full`}
                        ></span>
                      </span>

                      <p
                        className={`w-fit rounded-full px-3 py-1 font-medium ${data.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"}`}
                      >
                        {data.type}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllTransactionList;
