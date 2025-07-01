import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useBankTransactions } from "@/hooks/useBankTransactions";
import {
  transactionSchema,
  type TransactionSchemaType,
} from "@/schemas/transaction.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TransactionRowData from "@/components/TransactionRowData";
import TransactionRowDummyData from "@/components/TransactionRowDummyData";

const TransactionsPage = () => {
  const { bank_id } = useParams();
  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="h-screen w-full p-10">Invalid ID</div>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const {
    addTransaction,
    isAddError,
    AddError,
    transactionData,
    isTransactionListLoading,
    deleteTransaction,
    isAddPending,
  } = useBankTransactions(bank_id);
  const bankBalance = transactionData?.balance ?? 0;

  //submitdata
  const onSubmitData: SubmitHandler<TransactionSchemaType> = (data) => {
    addTransaction({
      ...data,
      amount: +data.amount,
      bank_id,
      type: data.type.toLowerCase() as "withdraw" | "deposit",
    });

    // console.log("Inputs data", { ...data, type: data.type.toLowerCase() });
  };
  console.log("transation data", transactionData);
  return (
    <div className="min-h-screen w-full p-10">
      <h1 className="mb-20">Balance: {bankBalance}</h1>

      <div className="border-dark-background/20 overflow-hidden rounded-2xl border">
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
            {/* dummy data loading */}
            {isTransactionListLoading && <TransactionRowDummyData />}

            {transactionData?.transactions.map((dataItem) => (
              <TransactionRowData
                key={dataItem.id}
                dataItem={dataItem}
                deleteTransaction={deleteTransaction}
              />
            ))}
          </tbody>
        </table>
      </div>

      <form className="mt-10" onSubmit={handleSubmit(onSubmitData)}>
        <input
          type="text"
          {...register("name")}
          placeholder="Input name of transaction"
          className="ring-dark-background/10 w-full rounded-lg p-3 ring"
        />
        {errors.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}

        <input
          type="number"
          {...register("amount")}
          placeholder="Amount of transaction"
          className="ring-dark-background/10 w-full rounded-lg p-3 ring"
        />
        {errors.amount && (
          <p className="text-sm text-red-400">{errors.amount.message}</p>
        )}
        {isAddError && (
          <p className="text-sm text-red-400">{AddError?.message}</p>
        )}

        <input
          type="text"
          {...register("note")}
          placeholder="Optional Note transaction"
          className="ring-dark-background/10 w-full rounded-lg p-3 ring"
        />
        {errors.note && (
          <p className="text-sm text-red-400">{errors.note.message}</p>
        )}

        <input
          type="text"
          {...register("type")}
          placeholder="Type of transaction deposit, withdraw )"
          className="ring-dark-background/10 w-full rounded-lg p-3 ring"
        />
        {errors.type && (
          <p className="text-sm text-red-400">{errors.type.message}</p>
        )}

        <button
          disabled={isAddPending}
          className="bg-dark-background text-light-background mt-5 rounded-lg p-3 px-6"
        >
          {isAddPending ? "Loading..." : "Add transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionsPage;
