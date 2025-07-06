import { useBank } from "@/hooks/useBank";
import { FaPlus } from "react-icons/fa6";
import BankRowData from "./BankRowData";
import LoadingPulse from "./LoadingPulse";

type BankListProps = {
  user_id: string;
  isShowModal: boolean;
  setShowModal: (isShowModal: boolean) => void;
};

const BankList = ({ user_id, isShowModal, setShowModal }: BankListProps) => {
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
    <div className="border-dark-background/20 min-h-100 rounded-3xl border p-5 md:p-10">
      {/* add bank wallet */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-dark-txt text-[clamp(.6rem,2vw+.6rem,1.25rem)] font-medium">
          Bank wallets
        </h1>
        <button
          onClick={() => setShowModal(!isShowModal)}
          className="text-light-background bg-dark-background hover:bg-dark-background/90 hidden rounded-full p-2 px-4 text-sm text-[clamp(.8rem,2vw+.8rem,.9rem)] transition-colors ease-in-out lg:flex lg:items-center lg:justify-center lg:space-x-2"
        >
          <span className="cursor-pointer">Add More Banks</span>
        </button>
        <button className="text-light-background bg-dark-background rounded-xl p-3 text-xs lg:hidden">
          <FaPlus onClick={() => setShowModal(!isShowModal)} />
        </button>
      </div>
      {isBankListLoading ? (
        <LoadingPulse />
      ) : isBanklistEmpty ? (
        <p className="text-dark-txt/70 text-[clamp(.5rem,2vw+.5rem,.9rem)]">
          You haven't added any banks yet.
        </p>
      ) : (
        <div className="hide-scrollbar w-full overflow-x-auto">
          <table className="min-w-full border-collapse divide-y divide-gray-200">
            <tbody>
              {!isBankListLoading &&
                bankList?.map((bankItemData) => (
                  <BankRowData
                    key={bankItemData.id}
                    bankItemData={bankItemData}
                    removeBank={removeBank}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BankList;
