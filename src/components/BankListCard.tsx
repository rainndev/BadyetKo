import type { BankListTypes } from "@/types/bank.types";
import { Link } from "react-router-dom";
import BankImage from "./BankImage";
import { FaPiggyBank } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

type BankListCardProps = {
  bankItemData: BankListTypes;
  removeBank: (id: string) => void;
};

const BankListCard = ({ bankItemData, removeBank }: BankListCardProps) => {
  return (
    <li className="bg-amber-300/10 flex items-center relative  justify-center p-10 rounded-lg">
      <Link to={`/bank/${bankItemData.id}`}>
        <div className="space-y-2">
          <li>Balance: {bankItemData.balance}</li>
          <li>{bankItemData.name}</li>

          {bankItemData.custom_bank_avatar ? (
            <BankImage path={bankItemData.custom_bank_avatar} />
          ) : (
            <FaPiggyBank className="text-5xl text-white" />
          )}
        </div>
      </Link>
      <IoMdClose
        className="cursor-pointer  text-white absolute right-2 top-2 text-2xl w-fit rounded-lg"
        onClick={() => removeBank(bankItemData.id)}
      />
    </li>
  );
};

export default BankListCard;
