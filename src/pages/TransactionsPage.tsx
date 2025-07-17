import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";
import { useBankTransactions } from "@/hooks/useBankTransactions";
import TransactionRowData from "@/components/TransactionRowData";
import TransactionAddModal from "@/components/TransactionAddModal";
import TransactionEditModal from "@/components/TransactionEditModal";
import { useRef, useState } from "react";
import { useCurrencyStore } from "@/store/CurrencyStore";
import type { TransactionListTypes } from "@/types/transaction.types";
import TransactionListPlaceholder from "@/components/TransactionListPlaceholder";
import { useVirtualizer } from "@tanstack/react-virtual";

const TransactionsPage = () => {
  const { bank_id } = useParams();
  const [isShowModal, setShowModal] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<TransactionListTypes | null>(
    null,
  );

  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="h-screen w-full p-10">Invalid ID</div>;

  const {
    transactionData,
    isTransactionListLoading,
    deleteTransaction,
    bankBalance: newBankBalance,
  } = useBankTransactions(bank_id);

  const bankBalance = newBankBalance?.balance ?? 0;
  console.log("total items---", transactionData?.count);

  const virtualizer = useVirtualizer({
    count: transactionData?.count || 0,
    estimateSize: () => 105,
    getScrollElement: () => scrollRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <>
      <TransactionAddModal
        isShowModal={isShowModal}
        setShowModal={setShowModal}
      />

      {/* Shared modal instance for edit */}
      {selectedItem && (
        <TransactionEditModal
          isShowEditModal={isEditOpen}
          setShowEditModal={setEditOpen}
          dataItem={selectedItem}
        />
      )}

      <div className="min-h-screen w-full p-5 md:p-10">
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
                [...Array(5)].map((_, idx) => (
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
    </>
  );
};

export default TransactionsPage;
