import { useBankTransactions } from "@/hooks/useBankTransactions";
import { IoClose } from "react-icons/io5";
import { isValidUUIDv4 } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import type { TransactionListTypes } from "@/types/transaction.types";
import { useEffect } from "react";
import {
  EditTransactionSchema,
  type EditTransactionSchemaType,
} from "@/schemas/transactionEdit.schema";

type TransactionEditModalProps = {
  isShowEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  dataItem: TransactionListTypes;
};

const TransactionEditModal = ({
  isShowEditModal,
  setShowEditModal,
  dataItem,
}: TransactionEditModalProps) => {
  const { bank_id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditTransactionSchema),
  });

  const { editTransaction, isEditPending, isEditSuccess } = useBankTransactions(
    bank_id ?? "",
  );

  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="h-screen w-full p-10">Invalid ID</div>;

  const onSubmitData: SubmitHandler<EditTransactionSchemaType> = (data) => {
    editTransaction({
      name: data.name || dataItem.name,
      note: data.note || dataItem.note,
      category: data.category || dataItem.category,
      id: dataItem.id,
    });
  };

  useEffect(() => {
    if (!isEditPending && isEditSuccess) {
      setShowEditModal(false);
      reset();
    }
  }, [isEditPending, isEditSuccess]);

  return (
    isShowEditModal &&
    createPortal(
      <div className="bg-dark-background/90 fixed inset-0 z-50 flex h-dvh w-full items-center justify-center backdrop-blur-lg">
        <div className="bg-light-background text-dark-txt mx-3 w-full max-w-xl rounded-2xl p-3 shadow-2xl">
          <div className="border-dark-txt/10 flex justify-between border-b-2 p-5 md:p-10">
            <h1 className="text-[clamp(.8rem,2vw+.8rem,1.5rem)]">
              Update Transaction
            </h1>
            <button
              className="text-dark-txt/50 cursor-pointer text-2xl"
              onClick={() => setShowEditModal(false)}
              disabled={isEditPending}
            >
              <IoClose />
            </button>
          </div>

          <div className="p-5 md:p-10">
            <form
              className="relative space-y-2 rounded-2xl"
              onSubmit={handleSubmit(onSubmitData)}
            >
              {/* Update Name of tx */}
              <div>
                <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
                  Transaction Name
                </p>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder={dataItem.name}
                  className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
                />
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              {/* Update of Category tx */}

              <div>
                <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
                  Category
                </p>
                <input
                  type="text"
                  {...register("category")}
                  placeholder="e.g. Food"
                  className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
                />
                {errors.category && (
                  <p className="text-sm text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Update Note of tx */}
              <div>
                <p className="text-dark-txt/90 mb-2 text-[clamp(.6rem,2vw+.6rem,1.125rem)]">
                  Note{" "}
                  <span className="text-dark-txt/50 text-sm">(Optional)</span>
                </p>
                <input
                  type="text"
                  {...register("note")}
                  placeholder={dataItem.note || "e.g. Monthly electricity bill"}
                  className="ring-dark-background/10 focus:ring-dark-background w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
                />
                {errors.note && (
                  <p className="text-sm text-red-400">{errors.note.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isEditPending}
                className="bg-dark-background hover:bg-dark-background/90 text-light-background mt-5 cursor-pointer rounded-lg p-3 px-6 text-[clamp(.6rem,1vw+.6rem,1rem)] transition-colors ease-in-out"
              >
                {isEditPending ? "Loading..." : "Update transaction"}
              </button>
            </form>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
};

export default TransactionEditModal;
