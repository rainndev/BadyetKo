import { useCurrencyStore } from "@/store/CurrencyStore";
import type { BankListTypes } from "@/types/bank.types";
import { useNavigate } from "react-router-dom";
import BankImage from "./ui/BankImage";
import { IoClose } from "react-icons/io5";

type BankGridDataProps = {
  bankItemData: BankListTypes;
  removeBank: (params: { bankID: string; avatarFilePath: string }) => void;
  isTrashEnabled: boolean;
};

const BankGridData = ({
  bankItemData,
  removeBank,
  isTrashEnabled,
}: BankGridDataProps) => {
  const navigate = useNavigate();
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const { id, balance, custom_bank_avatar } = bankItemData;

  console.log("custom avatar path", custom_bank_avatar);

  return (
    <div
      onClick={() => !isTrashEnabled && navigate(`/bank/${id}`)}
      className={`bg-dark-background/4 hover:bg-dark-background/10 relative flex w-full cursor-pointer flex-col items-start justify-center rounded-2xl p-5 md:rounded-3xl md:p-7`}
    >
      <div className="flex w-full items-center justify-center gap-5">
        <div className="flex size-8 items-center justify-center">
          <BankImage custom_bank_avatar={custom_bank_avatar ?? ""} />
        </div>
      </div>
      {isTrashEnabled && (
        <div
          onClick={() =>
            removeBank({
              bankID: id,
              avatarFilePath: custom_bank_avatar as string,
            })
          }
          className={`bg-light-background text-dark-background/40 absolute -top-3 -right-3 rounded-full p-2`}
        >
          <IoClose />
        </div>
      )}
      <p className="text-dark-txt/80 text-fluid-sm mt-5 max-w-fit truncate tabular-nums">
        {getformattedAmount(balance ?? 0)}
      </p>
    </div>
  );
};

export default BankGridData;
