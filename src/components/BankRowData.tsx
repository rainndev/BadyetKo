import type { BankListTypes } from "@/types/bank.types";
import BankImage from "./BankImage";
import { FaPiggyBank } from "react-icons/fa6";
import { PiTrashSimple } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useCurrencyStore } from "@/store/CurrencyStore";

type BankRowDataProps = {
  bankItemData: BankListTypes;
  removeBank: (id: string) => void;
};

const BankRowData = ({ bankItemData, removeBank }: BankRowDataProps) => {
  const navigate = useNavigate();
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const { id, name, balance, custom_bank_avatar } = bankItemData;

  return (
    <tr>
      <td
        onClick={() => navigate(`/bank/${id}`)}
        className="cursor-pointer px-5 whitespace-nowrap text-gray-600"
      >
        {custom_bank_avatar ? (
          <BankImage path={custom_bank_avatar} />
        ) : (
          <FaPiggyBank className="text-dark-background text-4xl" />
        )}
      </td>

      <td className="p-4 px-5 text-[clamp(.4rem,2vw+.4rem,1rem)] text-gray-600">
        <p>{getformattedAmount(balance ?? 0)}</p>
      </td>

      <td className="truncate p-4 px-5 text-[clamp(.4rem,2vw+.4rem,1rem)] text-gray-600">
        <p>{name}</p>
      </td>

      <td className="cursor-pointer p-4 px-5 text-gray-600">
        <PiTrashSimple
          onClick={() => removeBank(bankItemData.id)}
          className="hover:text-dark-background text-lg"
        />
      </td>
    </tr>
  );
};

export default BankRowData;
