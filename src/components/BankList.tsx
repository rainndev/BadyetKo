import { useBank } from "@/hooks/useBank";
import { FaPlus } from "react-icons/fa6";
import { PiEmptyThin, PiTrashSimpleLight } from "react-icons/pi";
import { useState } from "react";
import BankGridData from "./BankGridData";
import BankGridPlaceholder from "./BankGridPlaceholder";
import { useSession } from "@/context/SessionContext";

type BankListProps = {
  isShowModal: boolean;
  setShowModal: (isShowModal: boolean) => void;
};

const BankList = ({ isShowModal, setShowModal }: BankListProps) => {
  const [isTrashEnabled, setTrashEnabled] = useState(false);
  const { userID } = useSession();

  const {
    removeBank,
    bankList,
    isBankListError,
    bankListError,
    isBankListLoading,
    isBanklistEmpty,
  } = useBank(userID);

  if (isBankListError)
    return (
      <div className="min-h-screen w-full p-10">{bankListError?.message}</div>
    );

  return (
    <div className="border-dark-background/20 @container min-h-100 rounded-3xl p-2 py-5 md:p-10 lg:border">
      {/* add bank wallet */}
      <div className="mb-5 flex flex-col gap-2">
        {/* -----header with add bank btn */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-dark-txt text-fluid-xl font-semibold">
            Accounts
          </h1>

          <div className="flex gap-1 md:gap-2">
            <button
              className="text-dark-background text-fluid-xl cursor-pointer rounded-full p-1"
              onClick={() => setTrashEnabled(!isTrashEnabled)}
            >
              <PiTrashSimpleLight />
            </button>
            <button
              onClick={() => setShowModal(!isShowModal)}
              className="text-light-background bg-dark-background hover:bg-dark-background/90 text-fluid-sm hidden rounded-full p-2 px-4 transition-colors ease-in-out @sm:flex @sm:items-center @sm:justify-center @sm:space-x-2"
            >
              <span className="cursor-pointer">Add More Accounts</span>
            </button>

            <button className="text-light-background bg-dark-background rounded-xl p-3 text-xs @sm:hidden">
              <FaPlus onClick={() => setShowModal(!isShowModal)} />
            </button>
          </div>
        </div>
      </div>

      {isBanklistEmpty && !isBankListLoading && (
        <div className="text-dark-txt/70 gap-2text-dark-txt/70 flex aspect-auto min-h-100 w-full items-center justify-center gap-2">
          <PiEmptyThin className="text-xl" />
          <p className="text-fluid-sm">You haven't added any banks yet.</p>
        </div>
      )}

      <div className={`hide-scrollbar w-full`}>
        <div className="grid grid-cols-2 gap-1 @sm:grid-cols-3 @md:grid-cols-4 @md:gap-2 @lg:grid-cols-5">
          {isBankListLoading &&
            [...new Array(5)].map((_, idx) => (
              <BankGridPlaceholder key={"bank-grid-placehold" + idx} />
            ))}

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
    </div>
  );
};

export default BankList;
