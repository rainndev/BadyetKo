import { useTransactionList } from "@/queries/useTransactionList";
import TransactionListPlaceholder from "./TransactionListPlaceholder";
import { PiEmptyThin } from "react-icons/pi";
import TransactionRowData from "./TransactionRowData";

const AllTransactionList = () => {
  const { data, isLoading } = useTransactionList();

  const isTXlistEmpty = !(
    Array.isArray(data?.transactions) && data.transactions.length > 0
  );

  return (
    <div className="border-dark-background/20 min-h-100 w-full rounded-3xl p-2 py-5 lg:border lg:p-10">
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

        <div className="flex w-full flex-col gap-3">
          {isLoading &&
            [...Array(5)].map((_, idx) => (
              <TransactionListPlaceholder
                key={"transaction-all-list-placeholder" + idx}
              />
            ))}

          {data?.transactions.map((dataItem) => (
            <TransactionRowData
              dataItem={dataItem}
              isRecentList={true}
              key={dataItem.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTransactionList;
