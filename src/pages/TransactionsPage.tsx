import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";
import { useTransactionList } from "../queries/useTransactionList";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type TransactionInsertTypes } from "../types/transaction.types";
import { useCreateTransaction } from "../queries/useCreateTransaction";

const TransactionsPage = () => {
  const { register, handleSubmit } = useForm<TransactionInsertTypes>();
  const { bank_id } = useParams();
  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="w-full h-screen p-10">Invalid ID</div>;

  //hook for getting list of transactions
  const { data, isLoading } = useTransactionList(bank_id);

  //hook for adding transaction
  const { mutate: addTransaction, isPending: isAddPending } =
    useCreateTransaction(bank_id);

  //submitdata
  const onSubmitData: SubmitHandler<TransactionInsertTypes> = (data) => {
    addTransaction({ ...data, amount: +data.amount, bank_id });
    console.log("Inputs data", data);
  };

  return (
    <div className="w-full h-screen p-10">
      <ul className="flex flex-col gap-5">
        {isLoading && <li>Loading...</li>}
        {data?.map((dataItem) => (
          <div key={dataItem.id}>
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
          {...register("type")}
          placeholder="Type of transaction"
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
