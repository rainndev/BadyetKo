import type { BankListTypes } from "@/types/bank.types";
import BankImage from "./BankImage";
import { FaPiggyBank } from "react-icons/fa6";
import { PiTrashSimple } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "@/utils/helper";

type BankRowDataProps = {
  bankItemData: BankListTypes;
  removeBank: (id: string) => void;
};

const BankRowData = ({ bankItemData, removeBank }: BankRowDataProps) => {
  const navigate = useNavigate();
  const { id, name, balance, custom_bank_avatar } = bankItemData;

  return (
    <tr>
      <td
        onClick={() => navigate(`/bank/${id}`)}
        className="cursor-pointer p-4 pl-10 text-gray-600"
      >
        {custom_bank_avatar ? (
          <BankImage path={custom_bank_avatar} />
        ) : (
          <FaPiggyBank className="text-dark-background text-4xl" />
        )}
      </td>

      <td className="p-4 pl-10 text-gray-600">
        <p>{formatMoney(balance ?? 0, "en-PH", "currency", "PHP")}</p>
      </td>

      <td className="p-4 pl-10 text-gray-600">
        <p>{name}</p>
      </td>

      <td className="cursor-pointer p-4 pl-10 text-gray-600">
        <PiTrashSimple
          onClick={() => removeBank(bankItemData.id)}
          className="text-lg"
        />
      </td>
    </tr>
  );
};

export default BankRowData;
