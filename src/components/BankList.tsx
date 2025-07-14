import { useBank } from "@/hooks/useBank";
import { FaPlus } from "react-icons/fa6";
import { PiTrashSimpleLight } from "react-icons/pi";
import LoadingPulse from "./LoadingPulse";
import { useState } from "react";
import BankGridData from "./BankGridData";

type BankListProps = {
  user_id: string;
  isShowModal: boolean;
  setShowModal: (isShowModal: boolean) => void;
};

const BankList = ({ user_id, isShowModal, setShowModal }: BankListProps) => {
  const [isTrashEnabled, setTrashEnabled] = useState(false);

  const {
    removeBank,
    bankList,
    isBankListError,
    bankListError,
    isBankListLoading,
    isBanklistEmpty,
  } = useBank(user_id);

  if (isBankListError)
    return (
      <div className="min-h-screen w-full p-10">{bankListError?.message}</div>
    );

  return (
    <div className="border-dark-background/20 @container min-h-100 rounded-3xl p-2 md:border md:p-10">
      {/* add bank wallet */}
      <div className="mb-5 flex flex-col gap-2">
        {/* -----header with add bank btn */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-dark-txt text-[clamp(.9rem,2vw+.9rem,1.25rem)] font-medium">
            Bank wallets
          </h1>

          <div className="flex gap-1 md:gap-2">
            <button
              className="text-dark-background cursor-pointer rounded-full p-1 text-[clamp(.9rem,2vw+.9rem,1.5rem)]"
              onClick={() => setTrashEnabled(!isTrashEnabled)}
            >
              <PiTrashSimpleLight />
            </button>
            <button
              onClick={() => setShowModal(!isShowModal)}
              className="text-light-background bg-dark-background hover:bg-dark-background/90 hidden rounded-full p-2 px-4 text-sm text-[clamp(.8rem,2vw+.8rem,.9rem)] transition-colors ease-in-out @sm:flex @sm:items-center @sm:justify-center @sm:space-x-2"
            >
              <span className="cursor-pointer">Add More Banks</span>
            </button>

            <button className="text-light-background bg-dark-background rounded-xl p-3 text-xs @sm:hidden">
              <FaPlus onClick={() => setShowModal(!isShowModal)} />
            </button>
          </div>
        </div>
      </div>
      {isBankListLoading ? (
        <LoadingPulse />
      ) : isBanklistEmpty ? (
        <p className="text-dark-txt/70 text-[clamp(.5rem,2vw+.5rem,.9rem)]">
          You haven't added any banks yet.
        </p>
      ) : (
        <div className={`hide-scrollbar w-full`}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
            {!isBankListLoading &&
              bankList?.map((bankItemData) => (
                <BankGridData
                  key={bankItemData.id}
                  bankItemData={bankItemData}
                  isTrashEnabled={isTrashEnabled}
                  removeBank={removeBank}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BankList;
