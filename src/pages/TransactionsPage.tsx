import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";
import { useBankTransactions } from "@/hooks/useBankTransactions";
import TransactionRowData from "@/components/TransactionRowData";
import TransactionAddModal from "@/components/TransactionAddModal";
import TransactionEditModal from "@/components/TransactionEditModal";
import { useState } from "react";
import { useCurrencyStore } from "@/store/CurrencyStore";
import type { TransactionListTypes } from "@/types/transaction.types";
import TransactionListPlaceholder from "@/components/TransactionListPlaceholder";

const TransactionsPage = () => {
  const { bank_id } = useParams();
  const [isShowModal, setShowModal] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TransactionListTypes | null>(
    null,
  );

  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="h-screen w-full p-10">Invalid ID</div>;

  const { transactionData, isTransactionListLoading, deleteTransaction } =
    useBankTransactions(bank_id);

  const bankBalance = transactionData?.balance ?? 0;

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

      <div className="min-h-screen w-full p-7 md:p-10">
        <h1 className="mb-20 tabular-nums">
          Balance: {getformattedAmount(bankBalance)}
        </h1>

        <div className="hide-scrollbar h-fit overflow-x-auto">
          <div className="flex flex-col gap-2 divide-y divide-gray-100">
            {isTransactionListLoading &&
              [...Array(5)].map((_, idx) => (
                <TransactionListPlaceholder
                  key={"transaction-list-placeholder" + idx}
                />
              ))}

            {transactionData?.transactions.map((dataItem) => (
              <TransactionRowData
                key={dataItem.id}
                dataItem={dataItem}
                deleteTransaction={deleteTransaction}
                setEditOpen={setEditOpen}
                setSelectedItem={setSelectedItem}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-dark-background hover:bg-dark-background/90 text-light-background text-fluid-sm mt-5 cursor-pointer rounded-lg p-3 px-6 transition-colors ease-in-out"
        >
          Add New Transaction
        </button>

        <div className="h-20" />
      </div>
    </>
  );
};

export default TransactionsPage;
