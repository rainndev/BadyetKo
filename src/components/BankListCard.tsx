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
    <li className="border-dark-background/20 relative flex items-center justify-center rounded-2xl border p-10">
      <Link to={`/bank/${id}`}>
        <div className="space-y-2">
          <p>Balance: {balance}</p>
          <p>{name}</p>

          {custom_bank_avatar ? (
            <BankImage path={custom_bank_avatar} />
          ) : (
            <FaPiggyBank className="text-dark-background text-5xl" />
          )}
        </div>
      </Link>
      <IoMdClose
        className="absolute top-2 right-2 w-fit cursor-pointer rounded-lg text-2xl text-white"
        onClick={() => removeBank(bankItemData.id)}
      />
    </li>
  );
};

export default BankListCard;
