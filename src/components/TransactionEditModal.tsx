import { useAccountTransactions } from "@/hooks/useAccountTransactions";
import { IoClose } from "react-icons/io5";
import { isValidUUIDv4 } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import type { TransactionListTypes } from "@/types/transaction.types";
import { useEffect, useState } from "react";
import {
  EditTransactionSchema,
  type EditTransactionSchemaType,
} from "@/schemas/transactionEdit.schema";
import SelectCategoryForm from "./SelectCategoryForm";
import TransparentLogoOnly from "@/assets/logos/transparent-logo-only.png";
import { motion } from "framer-motion";

type TransactionEditModalProps = {
  setShowEditModal: (show: boolean) => void;
  dataItem: TransactionListTypes;
};

const TransactionEditModal = ({
  setShowEditModal,
  dataItem,
}: TransactionEditModalProps) => {
  const { account_id } = useParams();
  const [formCategory, setFormCategory] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditTransactionSchema),
  });

  const { editTransaction, isEditPending, isEditSuccess } =
    useAccountTransactions(account_id ?? "");

  if (!account_id || !isValidUUIDv4(account_id))
    return <div className="h-screen w-full p-10">Invalid ID</div>;

  const onSubmitData: SubmitHandler<EditTransactionSchemaType> = (data) => {
    editTransaction({
      name: data.name || dataItem.name,
      note: data.note || dataItem.note,
      category: formCategory || dataItem.category,
      id: dataItem.id,
    });
  };

  useEffect(() => {
    if (!isEditPending && isEditSuccess) {
      setShowEditModal(false);
      reset();
    }
  }, [isEditPending, isEditSuccess]);

  return createPortal(
    <div className="bg-dark-background/90 font-nunito fixed inset-0 z-50 flex h-dvh w-full items-center justify-center font-medium backdrop-blur-lg">
      <motion.div
        initial={{
          scale: 0.95,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.95,
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="bg-light-background text-dark-txt mx-3 w-full max-w-md rounded-2xl p-3 shadow-2xl"
      >
        <div className="border-dark-txt/10 flex justify-between p-5">
          <div className="flex items-center gap-2">
            <div className="text-fluid-lg w-fit rounded-full border p-1">
              <img src={TransparentLogoOnly} className="w-6" />
            </div>

            <h1 className="text-fluid-lg font-inter w-full text-start font-semibold">
              Update Transaction
            </h1>
          </div>

          <button
            className="text-dark-txt/50 text-fluid-xl cursor-pointer"
            onClick={() => setShowEditModal(false)}
            disabled={isEditPending}
          >
            <IoClose />
          </button>
        </div>

        <div className="p-5">
          <form
            className="relative space-y-2 rounded-2xl"
            onSubmit={handleSubmit(onSubmitData)}
          >
            {/* Update Name of tx */}
            <div>
              <p className="text-dark-txt/90 text-fluid-base mb-2">
                Transaction Name
              </p>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder={dataItem.name}
                className="ring-dark-background/10 focus:ring-dark-background text-fluid-sm w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            {/* Update of Category tx */}

            <div>
              <p className="text-dark-txt/90 text-fluid-base mb-2">Category</p>
              <SelectCategoryForm setFormCategory={setFormCategory} />
            </div>

            {/* Update Note of tx */}
            <div>
              <p className="text-dark-txt/90 text-fluid-base mb-2">
                Note{" "}
                <span className="text-dark-txt/50 text-sm">(Optional)</span>
              </p>
              <input
                type="text"
                {...register("note")}
                placeholder={dataItem.note || "e.g. Monthly electricity bill"}
                className="ring-dark-background/10 focus:ring-dark-background text-fluid-sm w-full rounded-lg p-3 ring transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-1 focus:outline-none"
              />
              {errors.note && (
                <p className="text-sm text-red-400">{errors.note.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isEditPending}
              className="bg-dark-background hover:bg-dark-background/90 text-light-background text-fluid-sm w-full cursor-pointer rounded-lg p-3 px-6 transition-colors ease-in-out"
            >
              {isEditPending ? "Loading..." : "Update transaction"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
};

export default TransactionEditModal;
