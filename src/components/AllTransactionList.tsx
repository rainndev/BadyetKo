import { useTransactionList } from "@/queries/useTransactionList";
import { getReadableDate } from "@/utils/helper";
import LoadingPulse from "./LoadingPulse";
import { useCurrencyStore } from "@/store/CurrencyStore";

const AllTransactionList = () => {
  const { data, isLoading } = useTransactionList();
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

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
          <table className="w-full">
            <tbody>
              {data?.transactions.map((data) => (
                <tr
                  key={data.id}
                  className="hover:bg-dark-background/8 w-full rounded-xl transition-colors ease-in-out"
                >
                  <td className="rounded-l-xl p-4 pl-2 text-[clamp(.4rem,2vw+.4rem,0.875rem)] text-nowrap text-gray-600">
                    {getReadableDate(data.created_at)}
                  </td>
                  <td className="max-w-xs truncate p-4 text-[clamp(.4rem,2vw+.4rem,0.875rem)] text-gray-600">
                    {data.name}
                  </td>
                  <td
                    className={`p-4 text-[clamp(.4rem,2vw+.4rem,0.875rem)] font-semibold ${data.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"}`}
                  >
                    <p className="text-nowrap">
                      {(data.type === "deposit" ? "+" : "-") +
                        getformattedAmount(data.amount)}
                    </p>
                  </td>
                  <td className="rounded-r-xl">
                    <div className="flex justify-center p-4 pr-2 text-[clamp(.4rem,1vw+.4rem,0.875rem)] text-gray-600">
                      <p
                        className={`w-fit rounded-full px-3 py-1 font-medium ${data.type === "deposit" ? "bg-[#bbefcf] text-[#477d59]" : "bg-[#fbe4e5] text-[#ad383a]"}`}
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
