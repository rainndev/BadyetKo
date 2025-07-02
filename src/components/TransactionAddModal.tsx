import { useBankTransactions } from "@/hooks/useBankTransactions";
import {
  transactionSchema,
  type TransactionSchemaType,
} from "@/schemas/transaction.schema";
import { IoClose } from "react-icons/io5";
import { isValidUUIDv4 } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TransactionListTypes } from "@/types/transaction.types";

type TransactionAddModalProps = {
  isShowModal: boolean;
  setShowModal: (show: boolean) => void;
};

type formTransactionType = TransactionListTypes["type"];

const TransactionAddModal = ({
  isShowModal,
  setShowModal,
}: TransactionAddModalProps) => {
  const { bank_id } = useParams();
  const [formTransactionType, setFormTransactionType] =
    useState<formTransactionType>("deposit");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const { addTransaction, isAddError, AddError, isAddPending } =
    useBankTransactions(bank_id ?? "");

  if (!isShowModal) return null;
  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="h-screen w-full p-10">Invalid ID</div>;

  const onSubmitData: SubmitHandler<TransactionSchemaType> = (data) => {
    console.log("type", formTransactionType);
    addTransaction({
      ...data,
      amount: +data.amount,
      bank_id,
      type: formTransactionType,
    });

    setShowModal(false);
  };

  return (
    <div className="bg-dark-background/5 fixed left-0 flex h-full w-full items-center justify-center backdrop-blur-lg">
      <div className="bg-light-background text-dark-txt w-full max-w-xl rounded-2xl shadow-2xl">
        <div className="border-dark-txt/10 flex justify-between border-b-2 px-10 py-7">
          <h1 className="text-2xl">Add New Transaction</h1>
          <button
            className="text-dark-txt/50 cursor-pointer text-2xl"
            onClick={() => setShowModal(false)}
            disabled={isAddPending}
          >
            <IoClose />
          </button>
        </div>

        <div className="p-10">
          <form
            className="relative space-y-2 rounded-2xl"
            onSubmit={handleSubmit(onSubmitData)}
          >
            {/* Name of transaction */}
            <div>
              <p className="text-dark-txt/90 mb-2 text-lg">Transaction Name</p>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="e.g. Grocery shopping"
                className="ring-dark-background/10 text-dark-txt/80 w-full rounded-lg p-3 ring"
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Amount of transaction */}
            <div>
              <p className="text-dark-txt/90 mb-2 text-lg">Amount</p>
              <input
                type="number"
                {...register("amount")}
                placeholder="e.g. 1500"
                className="ring-dark-background/10 text-dark-txt/80 w-full rounded-lg p-3 ring"
              />
              {errors.amount && (
                <p className="text-sm text-red-400">{errors.amount.message}</p>
              )}
              {isAddError && (
                <p className="text-sm text-red-400">{AddError?.message}</p>
              )}
            </div>

            <div>
              <p className="text-dark-txt/90 mb-2 text-lg">
                Note{" "}
                <span className="text-dark-txt/50 text-sm">(Optional)</span>
              </p>
              <input
                type="text"
                {...register("note")}
                placeholder="e.g. Monthly electricity bill"
                className="ring-dark-background/10 text-dark-txt/80 w-full rounded-lg p-3 ring"
              />
              {errors.note && (
                <p className="text-sm text-red-400">{errors.note.message}</p>
              )}
            </div>
            <div className="w-full">
              <p className="text-dark-txt/90 mb-2 text-lg">Type</p>
              <Select
                onValueChange={(value: formTransactionType) =>
                  setFormTransactionType(value)
                }
              >
                <SelectTrigger className="ring-dark-background/10 text-dark-txt/80 w-full rounded-lg !p-6 !pl-3 ring">
                  <SelectValue placeholder="Deposit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="text-dark-txt/80 p-3" value="deposit">
                    Deposit
                  </SelectItem>
                  <SelectItem className="text-dark-txt/80 p-3" value="withdraw">
                    Withdraw
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              disabled={isAddPending}
              className="bg-dark-background text-light-background mt-5 rounded-lg p-3 px-6"
            >
              {isAddPending ? "Loading..." : "Add transaction"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionAddModal;
