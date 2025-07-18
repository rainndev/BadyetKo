import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";
import { useTransactionListStore } from "@/store/TransactionListStore";
import type { TransactionListTypes } from "@/types/transaction.types";
import { hexToRgba } from "@/utils/helper";
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
  const isCategoryLabelEnabled = useTransactionListStore(
    (state) => state.isCategoryLabelEnabled,
  );

  const { amount, name, note, type, created_at, id, categories } = dataItem;
  const isDeposit = dataItem.type === "deposit";

  const handleEdit = () => {
    setSelectedItem(dataItem);
    setEditOpen(true);
  };

  return (
    <div className="bg-dark-background/4 flex w-full flex-col rounded-lg px-5 py-2 transition-colors ease-in-out">
      <div className="flex w-full items-center justify-between">
        <div>
          {/* tx name */}
          <div className="flex items-center justify-start gap-2">
            <h1 className="text-fluid-base max-w-[10rem] truncate text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
              {name}
            </h1>
          </div>

          {/* tx note */}
          <p className="text-dark-txt/50 text-fluid-sm w-fit max-w-[10rem] truncate rounded-lg text-nowrap md:max-w-[20rem] lg:max-w-[30rem]">
            {note || "n/a"}
          </p>
        </div>

        {/* edit/delete modal */}
        <div className="text-dark-txt/50 text-fluid-base">
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
        <div className="text-fluid-xs flex items-center gap-2">
          {isCategoryLabelEnabled ? (
            <div
              style={{
                backgroundColor: hexToRgba(categories?.color || "#f26f6f", 30),
                border: "1px solid",
                borderColor: categories?.color || "#f26f6f",
              }}
              className={`flex items-center justify-center rounded-2xl border px-2`}
            >
              <p
                className={`text-dark-txt/80 w-fit max-w-[5rem] truncate rounded-full px-1 py-0.5 text-center font-medium first-letter:capitalize sm:max-w-[10rem] md:px-2`}
              >
                {categories?.name || "Uncategorized"}
              </p>
            </div>
          ) : (
            <div
              className={`flex border ${isDeposit ? "border-green-200 bg-green-100" : "border-red-200 bg-red-100"} items-center justify-center rounded-2xl px-2`}
            >
              <p
                className={`w-fit rounded-full px-1 py-0.5 font-medium first-letter:capitalize md:px-2 ${isDeposit ? "text-[#477d59]" : "text-[#ad383a]"} text-center`}
              >
                {type}
              </p>
            </div>
          )}
        </div>

        {/* tx amount */}
        <div className={`flex flex-col items-end font-semibold`}>
          <p
            className={`text-fluid-base text-center text-nowrap tabular-nums ${isDeposit ? "text-[#477d59]" : "text-[#ad383a]"} `}
          >
            {(isDeposit ? "+" : "-") + getformattedAmount(amount)}
          </p>
          <p className="text-dark-txt/50 text-fluid-xs font-medium">
            {getformattedDate(created_at, country)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionRowData;
