import { useParams } from "react-router-dom";
import { isValidUUIDv4 } from "../utils/helper";
import TransactionAddModal from "@/components/TransactionAddModal";
import TransactionEditModal from "@/components/TransactionEditModal";
import { useState } from "react";
import type { TransactionListTypes } from "@/types/transaction.types";
import { AnimatePresence } from "framer-motion";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import TransactionList from "@/components/TransactionList";
import TransactionListSummary from "@/components/TransactionListSummary";

const TransactionsPage = () => {
  const { bank_id } = useParams();
  const [isShowModal, setShowModal] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TransactionListTypes | null>(
    null,
  );

  //Lock the body when showing modal
  useBodyScrollLock(isEditOpen);

  if (!bank_id || !isValidUUIDv4(bank_id))
    return <div className="h-screen w-full p-10">Invalid ID</div>;

  return (
    <>
      {/* Modal for adding new Transaction */}
      <TransactionAddModal
        isShowModal={isShowModal}
        setShowModal={setShowModal}
      />

      {/* Shared modal instance for edit */}
      <AnimatePresence>
        {selectedItem && isEditOpen && (
          <TransactionEditModal
            setShowEditModal={setEditOpen}
            dataItem={selectedItem}
          />
        )}
      </AnimatePresence>

      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        {/*Transaction list */}
        <TransactionList
          bank_id={bank_id}
          setEditOpen={setEditOpen}
          setSelectedItem={setSelectedItem}
        />
        {/* Transaction List Side Summary */}
        <TransactionListSummary bank_id={bank_id} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default TransactionsPage;
