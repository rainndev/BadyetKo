import { useCurrencyStore } from "@/store/CurrencyStore";
import type { BankListTypes } from "@/types/bank.types";
import { useNavigate } from "react-router-dom";
import { FaPiggyBank } from "react-icons/fa6";
import BankImage from "./ui/bankimage";

type BankGridDataProps = {
  bankItemData: BankListTypes;
};

const BankGridData = ({ bankItemData }: BankGridDataProps) => {
  const navigate = useNavigate();
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const { id, name, balance, custom_bank_avatar } = bankItemData;
  return (
    <div
      onClick={() => navigate(`/bank/${id}`)}
      className="bg-dark-background/5 hover:bg-dark-background/10 flex w-full cursor-pointer flex-col items-center justify-center truncate rounded-xl p-5 md:rounded-3xl md:p-10"
    >
      <div className="flex size-8 items-center justify-center">
        <BankImage custom_bank_avatar={custom_bank_avatar ?? ""} />
      </div>

      <p className="mt-5 max-w-fit truncate text-[clamp(.5rem,1vw+.5rem,.8rem)] text-gray-600 tabular-nums">
        {name}
      </p>
      <p className="max-w-fit truncate text-[clamp(.5rem,1vw+.5rem,.8rem)] text-gray-600 tabular-nums">
        {getformattedAmount(balance ?? 0)}
      </p>
    </div>
  );
};

export default BankGridData;
