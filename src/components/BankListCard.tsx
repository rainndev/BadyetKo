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
  const { id, name, balance, custom_bank_avatar } = bankItemData;

  return (
    <li className="border border-dark-background/15 flex items-center relative  justify-center p-10 rounded-2xl">
      <Link to={`/bank/${id}`}>
        <div className="space-y-2">
          <p>Balance: {balance}</p>
          <p>{name}</p>

          {custom_bank_avatar ? (
            <BankImage path={custom_bank_avatar} />
          ) : (
            <FaPiggyBank className="text-5xl text-dark-background" />
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
