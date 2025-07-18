import { useBankTransactions } from "@/hooks/useBankTransactions";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, type Dispatch, type SetStateAction } from "react";
import TransactionListPlaceholder from "./TransactionListPlaceholder";
import TransactionRowData from "./TransactionRowData";
import type { TransactionListTypes } from "@/types/transaction.types";

type TransactionListProps = {
  bank_id: string;
  setEditOpen: (value: boolean) => void;
  setSelectedItem: Dispatch<SetStateAction<TransactionListTypes | null>>;
};

const TransactionList = ({
  bank_id,
  setEditOpen,
  setSelectedItem,
}: TransactionListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { transactionData, isTransactionListLoading, deleteTransaction } =
    useBankTransactions(bank_id);

  //virtualizer from tanstack
  const virtualizer = useVirtualizer({
    count: transactionData?.count || 0,
    estimateSize: () => 105,
    getScrollElement: () => scrollRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="order-2 min-h-screen w-full p-5 md:p-10 lg:order-1">
      <div
        ref={scrollRef}
        className="hide-scrollbar h-dvh overflow-auto overflow-x-auto lg:mb-0"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
          className="relative"
        >
          <div
            className="absolute top-0 left-0 w-full space-y-2"
            style={{
              transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            }}
          >
            {/* Skeleton loading */}
            {isTransactionListLoading &&
              [...Array(2)].map((_, idx) => (
                <TransactionListPlaceholder
                  key={"transaction-list-placeholder" + idx}
                />
              ))}

            {/* render items */}
            {virtualItems.map((vItem) => {
              const dataItem = transactionData?.transactions[vItem.index];
              if (!dataItem) return null;
              return (
                <TransactionRowData
                  key={vItem.key}
                  dataItem={dataItem}
                  deleteTransaction={deleteTransaction}
                  setEditOpen={setEditOpen}
                  setSelectedItem={setSelectedItem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
