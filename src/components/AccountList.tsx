import { useAccount } from "@/hooks/useAccount";
import { FaPlus } from "react-icons/fa6";
import { PiEmptyThin, PiTrashSimpleLight } from "react-icons/pi";
import { useState } from "react";
import AccountGridData from "./AccountGridData";
import AccountGridPlaceholder from "./AccountGridPlaceholder";

type AccountListProps = {
  isShowModal: boolean;
  setShowModal: (isShowModal: boolean) => void;
};

const AccountList = ({ isShowModal, setShowModal }: AccountListProps) => {
  const [isTrashEnabled, setTrashEnabled] = useState(false);

  const {
    removeAccount,
    accountList,
    isAccountListError,
    accountListError,
    isAccountListLoading,
    isAccountlistEmpty,
  } = useAccount();

  if (isAccountListError)
    return (
      <div className="min-h-screen w-full p-10">
        {accountListError?.message}
      </div>
    );

  return (
    <div className="border-dark-background/20 @container min-h-100 rounded-3xl p-2 py-5 lg:border lg:p-10">
      {/* add account wallet */}
      <div className="mb-5 flex flex-col gap-2">
        {/* -----header with add account btn */}
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
              className="bg-dark-background hover:bg-dark-background/90 text-light-background text-fluid-sm flex h-fit cursor-pointer items-center gap-2 rounded-lg p-3 transition-colors ease-in-out @lg:px-5"
            >
              <span className="hidden cursor-pointer @lg:block">
                Add More Account
              </span>
              <FaPlus
                className="block @lg:hidden"
                onClick={() => setShowModal(true)}
              />
            </button>
          </div>
        </div>
      </div>

      {isAccountlistEmpty && !isAccountListLoading && (
        <div className="text-dark-txt/70 gap-2text-dark-txt/70 flex aspect-auto min-h-100 w-full items-center justify-center gap-2">
          <PiEmptyThin className="text-xl" />
          <p className="text-fluid-sm">You haven't added any accounts yet.</p>
        </div>
      )}

      <div className={`hide-scrollbar w-full`}>
        <div className="grid grid-cols-2 gap-1 @sm:grid-cols-3 @md:gap-2 @lg:grid-cols-4">
          {isAccountListLoading &&
            [...new Array(5)].map((_, idx) => (
              <AccountGridPlaceholder key={"account-grid-placeholder" + idx} />
            ))}

          {!isAccountListLoading &&
            accountList?.map((accountItemData) => (
              <AccountGridData
                key={accountItemData.id}
                accountItemData={accountItemData}
                removeAccount={removeAccount}
                setTrashEnabled={setTrashEnabled}
                isTrashEnabled={isTrashEnabled}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AccountList;
