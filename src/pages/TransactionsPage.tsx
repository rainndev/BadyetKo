import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useBankTransactions } from "@/hooks/useBankTransactions";
import {
  transactionSchema,
  type TransactionSchemaType,
} from "@/schemas/transaction.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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

    console.log("Inputs data", { ...data, type: data.type.toLowerCase() });
  };

  return (
    <div className="min-h-screen w-full p-10">
      <h1 className="mb-20">Balance: {bankBalance}</h1>
      <ul className="flex flex-col gap-5">
        {isTransactionListLoading && <li>Loading...</li>}
        {transactionData?.transactions.map((dataItem) => (
          <div key={dataItem.id}>
            <button
              onClick={() => deleteTransaction(dataItem.id)}
              className="bg-dark-background text-light-background rounded-lg p-2 px-5"
            >
              Delete
            </button>
            <li>Name: {dataItem.name}</li>
            <li>Amount: {dataItem.amount}</li>
          </div>
        ))}
      </ul>

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
