import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";
import type { TransactionListTypes } from "@/types/transaction.types";
import { CiEdit } from "react-icons/ci";
import { PiTrashSimple } from "react-icons/pi";
import { RxDotsVertical } from "react-icons/rx";

interface TransactionRowDataProps {
  dataItem: TransactionListTypes;
  deleteTransaction: (id: number) => void;
  setEditOpen: (open: boolean) => void;
  setSelectedItem: (item: TransactionListTypes) => void;
}

const TransactionRowData = ({
  dataItem,
  deleteTransaction,
  setEditOpen,
  setSelectedItem,
}: TransactionRowDataProps) => {
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );

  const country = useCurrencyStore((state) => state.currencyOptions.country);
  const getformattedDate = useDateTimeStore((state) => state.getformattedDate);

  const { amount, name, note, type, created_at, id } = dataItem;
  const isDeposit = dataItem.type === "deposit";

  const handleEdit = () => {
    setSelectedItem(dataItem);
    setEditOpen(true);
  };

  return (
    <div className="flex w-full flex-col py-3 transition-colors ease-in-out">
      <div className="flex w-full items-center justify-between">
        <div>
          {/* tx name */}
          <div className="flex items-center justify-start gap-2">
            <h1 className="max-w-[10rem] truncate text-[clamp(.6rem,1vw+.6rem,1rem)] text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
              {name}
            </h1>
          </div>

          {/* tx note */}
          <p className="text-dark-txt/50 w-fit max-w-[10rem] truncate rounded-lg text-[clamp(.6rem,1vw+.6rem,0.85rem)] text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
            {note || "n/a"}
          </p>
        </div>

        {/* edit/delete modal */}
        <div className="text-dark-txt/50 text-[clamp(.9rem,2vw+.9rem,1rem)]">
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <RxDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-30 overflow-hidden rounded-2xl p-0 text-xs text-gray-600">
              <ul>
                <li
                  onClick={() => deleteTransaction(id)}
                  className="flex cursor-pointer items-center justify-between p-3 transition-colors ease-in-out hover:bg-gray-200"
                >
                  <p>Delete</p>
                  <PiTrashSimple className="text-sm" />
                </li>
                <li
                  onClick={handleEdit}
                  className="flex cursor-pointer items-center justify-between p-3 transition-colors ease-in-out hover:bg-gray-200"
                >
                  <p>Edit</p>
                  <CiEdit className="text-sm" />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-1 flex h-full w-full items-center justify-between gap-3 md:mt-0">
        {/* tx type */}
        <div className="flex items-center gap-2 text-[clamp(.5rem,1vw+.5rem,0.75rem)]">
          <div
            className={`flex border ${isDeposit ? "border-green-200 bg-green-100" : "border-red-200 bg-red-100"} items-center justify-center rounded-2xl px-2`}
          >
            <p
              className={`w-fit rounded-full px-1 py-0.5 font-medium first-letter:capitalize md:px-2 ${isDeposit ? "text-[#477d59]" : "text-[#ad383a]"} text-center`}
            >
              {type}
            </p>
          </div>
        </div>

        {/* tx amount */}
        <div className={`flex flex-col items-end font-semibold`}>
          <p
            className={`text-center text-[clamp(.6rem,1vw+.6rem,1.125rem)] text-nowrap tabular-nums ${isDeposit ? "text-[#477d59]" : "text-[#ad383a]"} `}
          >
            {(isDeposit ? "+" : "-") + getformattedAmount(amount)}
          </p>
          <p className="text-dark-txt/50 text-[clamp(.5rem,1vw+.5rem,0.80rem)] font-medium">
            {getformattedDate(created_at, country)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionRowData;
