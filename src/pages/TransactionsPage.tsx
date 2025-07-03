import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";
import { useBankTransactions } from "@/hooks/useBankTransactions";
import TransactionRowData from "@/components/TransactionRowData";
import TransactionAddModal from "@/components/TransactionAddModal";
import { useState } from "react";
import LoadingPulse from "@/components/LoadingPulse";
import { useCurrencyStore } from "@/store/CurrencyStore";

const TransactionsPage = () => {
  const { bank_id } = useParams();
  const [isShowModal, setShowModal] = useState(false);
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
      <div className="min-h-screen w-full p-5 md:p-10">
        <h1 className="mb-20">Balance: {getformattedAmount(bankBalance)}</h1>

        {isTransactionListLoading ? (
          <LoadingPulse />
        ) : (
          <div className="border-dark-background/20 hide-scrollbar overflow-x-auto rounded-2xl border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-5 pl-10 text-left text-sm font-semibold text-gray-700">
                    Date of Transaction
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-700">
                    Note
                  </th>

                  <th className="text-left text-sm font-semibold text-gray-700">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactionData?.transactions.map((dataItem) => (
                  <TransactionRowData
                    key={dataItem.id}
                    dataItem={dataItem}
                    deleteTransaction={deleteTransaction}
                  />
                ))}

                {/* dummy data loading */}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="bg-dark-background text-light-background mt-5 rounded-lg p-3 px-6 text-[clamp(.6rem,1vw+.6rem,1rem)]"
        >
          Add New Transaction
        </button>
        <div className="h-20" />
      </div>
    </>
  );
};

export default TransactionsPage;
