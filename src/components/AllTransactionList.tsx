import { useTransactionList } from "@/queries/useTransactionList";
import { formatMoney, getReadableDate } from "@/utils/helper";

const AllTransactionList = () => {
  const { data: allTransactionlist } = useTransactionList();
  console.log("all transaction list", allTransactionlist);
  return (
    <div className="p-5">
      <h1 className="text-dark-txt mb-5 text-[clamp(.6rem,2vw+.6rem,1.25rem)] font-medium">
        Recent Transactions
      </h1>

      <div className="hide-scrollbar overflow-x-auto">
        <table className="w-full">
          <tbody>
            {allTransactionlist?.transactions.map((data) => (
              <tr className="w-full">
                <td className="p-4 pl-0 text-[clamp(.4rem,2vw+.4rem,0.875rem)] text-nowrap text-gray-600">
                  {getReadableDate(data.created_at)}
                </td>
                <td className="truncate p-4 text-[clamp(.4rem,2vw+.4rem,0.875rem)] text-gray-600">
                  {data.name}
                </td>
                <td
                  className={`p-4 text-[clamp(.4rem,2vw+.4rem,0.875rem)] font-medium ${data.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"}`}
                >
                  <p className="text-nowrap">
                    {(data.type === "deposit" ? "+" : "-") +
                      formatMoney(data.amount, "en-PH", "currency", "PHP")}
                  </p>
                </td>
                <td className="p-4 pr-0 text-[clamp(.4rem,1vw+.4rem,0.875rem)] text-gray-600">
                  <p
                    className={`w-fit rounded-full px-3 py-1 font-medium ${data.type === "deposit" ? "bg-[#bbefcf] text-[#477d59]" : "bg-[#fbe4e5] text-[#ad383a]"}`}
                  >
                    {data.type}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransactionList;
