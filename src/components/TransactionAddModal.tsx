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
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TransactionListTypes } from "@/types/transaction.types";
import SelectCategoryForm from "./SelectCategoryForm";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

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
  const [formCategory, setFormCategory] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const { addTransaction, isAddError, AddError, isAddPending, isAddSuccess } =
    useBankTransactions(bank_id ?? "");

  //Lock the body when showing modal
  useBodyScrollLock(isShowModal);

  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="h-screen w-full p-10">Invalid ID</div>;

  const onSubmitData: SubmitHandler<TransactionSchemaType> = (data) => {
    console.log("type", formTransactionType);
    addTransaction({
      ...data,
      amount: +data.amount,
      category: formCategory || null,
      bank_id,
      type: formTransactionType,
    });
  };

  useEffect(() => {
    if (!isAddPending && isAddSuccess) {
      setShowModal(false);
      reset();
    }
  }, [isAddPending, isAddSuccess, setShowModal, reset]);

  return (
    isShowModal && (
      <div className="bg-dark-background/90 fixed left-0 z-10 flex h-dvh w-full items-center justify-center backdrop-blur-lg">
        <div className="bg-light-background text-dark-txt mx-3 w-full max-w-xl rounded-2xl p-3 shadow-2xl">
          <div className="border-dark-txt/10 flex justify-between border-b-2 p-5 md:p-10">
            <h1 className="text-[clamp(.8rem,2vw+.8rem,1.5rem)]">
              Add New Transaction
            </h1>
            <button
              className="text-dark-txt/50 cursor-pointer text-2xl"
              onClick={() => setShowModal(false)}
              disabled={isAddPending}
            >
              <IoClose />
            </button>
          </div>

          <div className="p-5 md:p-10">
            <form
              className="relative space-y-2 rounded-2xl"
              onSubmit={handleSubmit(onSubmitData)}
            >
              {/* Name of transaction */}
              <div>
                <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
                  Transaction Name
                </p>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="e.g. Grocery shopping"
                  className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
                />
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Amount of transaction */}
              <div>
                <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
                  Amount
                </p>
                <input
                  type="number"
                  {...register("amount")}
                  placeholder="e.g. 1500"
                  className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
                />
                {errors.amount && (
                  <p className="text-sm text-red-400">
                    {errors.amount.message}
                  </p>
                )}
                {isAddError && (
                  <p className="text-sm text-red-400">{AddError?.message}</p>
                )}
              </div>

              {/* Category of Transaction */}
              <div>
                <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
                  Category
                </p>
                <SelectCategoryForm setFormCategory={setFormCategory} />
              </div>

              {/* Note of transaction */}
              <div>
                <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
                  Note{" "}
                  <span className="text-dark-txt/50 text-sm">(Optional)</span>
                </p>
                <input
                  type="text"
                  {...register("note")}
                  placeholder="e.g. Monthly electricity bill"
                  className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
                />
                {errors.note && (
                  <p className="text-sm text-red-400">{errors.note.message}</p>
                )}
              </div>

              {/* type of transaction */}
              <div className="w-full">
                <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
                  Type
                </p>
                <Select
                  onValueChange={(value: formTransactionType) =>
                    setFormTransactionType(value)
                  }
                >
                  <SelectTrigger className="ring-dark-background/10 text-dark-txt/80 w-full rounded-lg !p-6 !pl-3 !text-[clamp(.6rem,1vw+.6rem,1rem)] ring">
                    <SelectValue placeholder="Deposit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="text-dark-txt/80 p-3"
                      value="deposit"
                    >
                      Deposit
                    </SelectItem>
                    <SelectItem
                      className="text-dark-txt/80 p-3"
                      value="withdraw"
                    >
                      Withdraw
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <button
                type="submit"
                disabled={isAddPending}
                className="bg-dark-background hover:bg-dark-background/90 text-light-background mt-5 cursor-pointer rounded-lg p-3 px-6 text-[clamp(.6rem,1vw+.6rem,1rem)] transition-colors ease-in-out"
              >
                {isAddPending ? "Loading..." : "Add transaction"}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default TransactionAddModal;
