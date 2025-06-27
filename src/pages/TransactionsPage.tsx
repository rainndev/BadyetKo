import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type TransactionInsertTypes } from "../types/transaction.types";
import { useBankTransactions } from "@/hooks/useBankTransactions";

const TransactionsPage = () => {
  const { register, handleSubmit } = useForm<TransactionInsertTypes>();
  const { bank_id } = useParams();
  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="w-full h-screen p-10">Invalid ID</div>;

  const {
    addTransaction,
    transactionList,
    isTransactionListLoading,
    deleteTransaction,
    isAddPending,
  } = useBankTransactions(bank_id);

  //submitdata
  const onSubmitData: SubmitHandler<TransactionInsertTypes> = (data) => {
    addTransaction({ ...data, amount: +data.amount, bank_id, type: "deposit" });
    console.log("Inputs data", data);
  };

  console.log("transaction rendered");
  return (
    <div className="w-full h-screen p-10">
      <ul className="flex flex-col gap-5">
        {isTransactionListLoading && <li>Loading...</li>}
        {transactionList?.map((dataItem) => (
          <div key={dataItem.id}>
            <button
              onClick={() => deleteTransaction(dataItem.id)}
              className="p-2 bg-amber-300 rounded-lg text-[#212121] px-5"
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
          className="ring ring-amber-300 p-3 rounded-lg w-full"
        />

        <input
          type="number"
          {...register("amount")}
          placeholder="Amount of transaction"
          className="ring ring-amber-300 p-3 rounded-lg w-full"
        />

        <input
          type="text"
          {...register("note")}
          placeholder="Optional Note transaction"
          className="ring ring-amber-300 p-3 rounded-lg w-full"
        />

        <button
          disabled={isAddPending}
          className="bg-amber-300 p-3 px-6 text-[#212121] mt-5 rounded-lg"
        >
          {isAddPending ? "Loading..." : "Add transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionsPage;
