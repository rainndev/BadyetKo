import { useBankTransactions } from "@/hooks/useBankTransactions";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, type Dispatch, type SetStateAction } from "react";
import TransactionListPlaceholder from "./TransactionListPlaceholder";
import TransactionRowData from "./TransactionRowData";
import type { TransactionListTypes } from "@/types/transaction.types";

type TransactionListProps = {
  bank_id: string;
  setEditOpen: (value: boolean) => void;
  setShowModal: (value: boolean) => void;
  setSelectedItem: Dispatch<SetStateAction<TransactionListTypes | null>>;
};

const TransactionList = ({
  bank_id,
  setEditOpen,
  setShowModal,
  setSelectedItem,
}: TransactionListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    transactionData,
    isTransactionListLoading,
    deleteTransaction,
    bankBalance: newBankBalance,
  } = useBankTransactions(bank_id);

  //net balance of each account
  const bankBalance = newBankBalance?.balance ?? 0;

  //format tx amount
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  //virtualizer from tanstack
  const virtualizer = useVirtualizer({
    count: transactionData?.count || 0,
    estimateSize: () => 105,
    getScrollElement: () => scrollRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="min-h-screen w-full p-5 md:p-10 xl:w-[50%]">
      <div className="mb-5 flex items-center justify-between gap-5">
        <h1 className="flex flex-col tabular-nums">
          <span className="text-fluid-base">Balance</span>
          <span>{getformattedAmount(bankBalance)}</span>
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-dark-background hover:bg-dark-background/90 text-light-background text-fluid-sm mt-5 h-fit cursor-pointer rounded-lg p-3 px-6 transition-colors ease-in-out"
        >
          Add New Transaction
        </button>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar mb-20 h-dvh overflow-auto overflow-x-auto lg:mb-0"
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
          className="relative"
        >
          <div
            className="absolute top-0 left-0 w-full space-y-2 divide-y divide-gray-200"
            style={{
              transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            }}
          >
            {/* data */}
            {isTransactionListLoading &&
              [...Array(2)].map((_, idx) => (
                <TransactionListPlaceholder
                  key={"transaction-list-placeholder" + idx}
                />
              ))}

            {virtualItems.map((vItem) => {
              const dataItem = transactionData?.transactions[vItem.index];
              if (!dataItem) return null;
              return (
                <TransactionRowData
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
