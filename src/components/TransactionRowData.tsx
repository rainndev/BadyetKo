import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrencyStore } from "@/store/CurrencyStore";
import type { TransactionListTypes } from "@/types/transaction.types";
import { getReadableDate } from "@/utils/helper";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { PiTrashSimple } from "react-icons/pi";
import TransactionEditModal from "./TransactionEditModal";

type TransactionRowDataProps = {
  dataItem: TransactionListTypes;
  deleteTransaction: (id: number) => void;
};

const TransactionRowData = ({
  dataItem,
  deleteTransaction,
}: TransactionRowDataProps) => {
  const [isShowEditModal, setShowEditModal] = useState(false);
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  return (
    <>
      <TransactionEditModal
        isShowEditModal={isShowEditModal}
        setShowEditModal={setShowEditModal}
        dataItem={dataItem}
      />
      <tr>
        <td className="p-4 pl-10 text-sm text-gray-600">
          {getReadableDate(dataItem.created_at)}
        </td>
        <td
          className={`p-4 py-2 text-sm font-semibold ${dataItem.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"} `}
        >
          {getformattedAmount(dataItem.amount)}
        </td>
        <td className="max-w-xs truncate p-4 py-2 text-sm text-gray-600">
          {dataItem.name}
        </td>
        <td className="p-4 py-2 text-xs">
          <p
            className={`w-fit rounded-full px-3 py-1 font-medium ${dataItem.type === "deposit" ? "bg-[#bbefcf] text-[#477d59]" : "bg-[#fbe4e5] text-[#ad383a]"}`}
          >
            {dataItem.type}
          </p>
        </td>
        <td className="max-w-xs truncate p-4 py-2 text-sm text-gray-600">
          {dataItem.note}
        </td>
        <td className="p-4 py-2 text-sm text-gray-600">
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <BsThreeDots />
            </PopoverTrigger>
            <PopoverContent className="w-30 overflow-hidden rounded-2xl p-0 text-xs text-gray-600">
              <ul>
                <li
                  onClick={() => deleteTransaction(dataItem.id)}
                  className="flex cursor-pointer items-center justify-between p-3 transition-colors ease-in-out hover:bg-gray-200"
                >
                  <p>Delete</p>
                  <PiTrashSimple className="text-sm" />
                </li>
                <li
                  onClick={() => setShowEditModal(true)}
                  className="flex cursor-pointer items-center justify-between p-3 transition-colors ease-in-out hover:bg-gray-200"
                >
                  <p>Edit</p>
                  <CiEdit className="text-sm" />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </td>
      </tr>
    </>
  );
};

export default TransactionRowData;
