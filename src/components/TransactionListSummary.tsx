import { useBankTransactions } from "@/hooks/useBankTransactions";
import { useCurrencyStore } from "@/store/CurrencyStore";

type TransactionListSummaryProps = {
  bank_id: string;
  setShowModal: (value: boolean) => void;
};

const TransactionListSummary = ({
  bank_id,
  setShowModal,
}: TransactionListSummaryProps) => {
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const { bankBalance: newBankBalance } = useBankTransactions(bank_id);

  //net balance of each account
  const bankBalance = newBankBalance?.balance ?? 0;

  return (
    <div className="p-5 md:p-10">
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
    </div>
  );
};

export default TransactionListSummary;
