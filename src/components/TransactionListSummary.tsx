import { useAccountTransactions } from "@/hooks/useAccountTransactions";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { FaPlus } from "react-icons/fa6";

type TransactionListSummaryProps = {
  account_id: string;
  setShowModal: (value: boolean) => void;
};

const TransactionListSummary = ({
  account_id,
  setShowModal,
}: TransactionListSummaryProps) => {
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const { accountBalance: newAccountBalance } =
    useAccountTransactions(account_id);

  //net balance of each account
  const accountBalance = newAccountBalance?.balance ?? 0;

  return (
    <div className="@container order-1 p-5 md:p-10 lg:order-2">
      <div className="mb-5 flex items-center justify-between gap-5">
        <h1 className="flex flex-col tabular-nums">
          <span className="text-fluid-base">Balance</span>
          <span>{getformattedAmount(accountBalance)}</span>
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-dark-background hover:bg-dark-background/90 text-light-background text-fluid-sm flex h-fit cursor-pointer items-center gap-2 rounded-lg p-3 transition-colors ease-in-out @lg:px-5"
        >
          <span className="hidden @lg:block">Add New Transaction</span>
          <FaPlus
            className="block @lg:hidden"
            onClick={() => setShowModal(true)}
          />
        </button>
      </div>
    </div>
  );
};

export default TransactionListSummary;
