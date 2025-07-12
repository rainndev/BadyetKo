import { useCurrencyStore } from "@/store/CurrencyStore";
import type { BankListTypes } from "@/types/bank.types";
import { useNavigate } from "react-router-dom";
import BankImage from "./ui/BankImage";
import { IoIosArrowForward } from "react-icons/io";
import { timeAgo } from "@/utils/DateTimeHelper";
type BankGridDataProps = {
  bankItemData: BankListTypes;
};

const BankGridData = ({ bankItemData }: BankGridDataProps) => {
  const navigate = useNavigate();
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const { id, name, balance, custom_bank_avatar, created_at } = bankItemData;
  return (
    <div
      onClick={() => navigate(`/bank/${id}`)}
      className="bg-dark-background/5 hover:bg-dark-background/10 flex w-full cursor-pointer flex-col items-start justify-center truncate rounded-2xl p-5 md:rounded-3xl md:p-7"
    >
      <div className="flex w-full items-center justify-between gap-5">
        <div className="flex size-8 items-center justify-center">
          <BankImage custom_bank_avatar={custom_bank_avatar ?? ""} />
        </div>

        <div className="w-full">
          <p className="text-dark-txt max-w-fit truncate text-[clamp(.6rem,1vw+.5rem,.9rem)] tabular-nums">
            {name}
          </p>
          <p className="max-w-fit truncate text-[clamp(.5rem,1vw+.5rem,.8rem)] text-gray-600 tabular-nums">
            {timeAgo(created_at)}
          </p>
        </div>

        <p>
          <IoIosArrowForward className="text-dark-txt/40" />
        </p>
      </div>

      <p className="text-dark-txt/80 mt-5 max-w-fit truncate text-[clamp(.5rem,1vw+.5rem,.8rem)] tabular-nums">
        {getformattedAmount(balance ?? 0)}
      </p>
    </div>
  );
};

export default BankGridData;
