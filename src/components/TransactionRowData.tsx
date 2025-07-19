import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";
import { useTransactionListStore } from "@/store/TransactionListStore";
import type { TransactionListTypes } from "@/types/transaction.types";
import { categoryIconMap } from "@/data/categoryIcon";
import { hexToRgba } from "@/utils/helper";
import { CiEdit } from "react-icons/ci";
import { PiTrashSimple } from "react-icons/pi";
import { RxDotsVertical } from "react-icons/rx";
import { CircleOff } from "lucide-react";

interface TransactionRowDataProps {
  dataItem: TransactionListTypes;
  isRecentList?: boolean;
  deleteTransaction?: (id: number) => void;
  setEditOpen?: (open: boolean) => void;
  setSelectedItem?: (item: TransactionListTypes) => void;
}

const TransactionRowData = ({
  dataItem,
  deleteTransaction,
  isRecentList = false,
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

  const { amount, name, note, created_at, id, categories } = dataItem;
  const isDeposit = dataItem.type === "deposit";
  const CategoryIcon =
    categoryIconMap[categories?.icon_id as keyof typeof categoryIconMap] ||
    CircleOff;

  const handleEdit = () => {
    setSelectedItem?.(dataItem);
    setEditOpen?.(true);
  };

  return (
    <div className="bg-dark-background/3 flex w-full items-center gap-2 rounded-lg p-4 transition-colors ease-in-out md:p-6">
      {/* category icon */}
      <div
        style={{
          backgroundColor: hexToRgba(categories?.color ?? "#f26f6f", 30),
          border: "1px solid",
          borderColor: categories?.color ?? "#f26f6f",
        }}
        className="text-fluid-sm h-fit rounded-lg p-2"
      >
        <CategoryIcon className="size-4" />
      </div>

      <div className="flex w-full flex-col items-start justify-center truncate">
        {/* tx name */}
        <h1 className="text-fluid-base max-w-full truncate text-start text-nowrap">
          {name}
        </h1>

        {/* tx note */}
        <p className="text-dark-txt/50 text-fluid-xs w-fit max-w-full truncate rounded-lg text-nowrap">
          {isCategoryLabelEnabled
            ? categories?.name || "No Category"
            : note || "No note provided"}
        </p>

        {/* tx type */}
        {/* <div
          style={{
            backgroundColor: hexToRgba(categories?.color || "#f26f6f", 30),
            border: "1px solid",
            borderColor: categories?.color || "#f26f6f",
          }}
          className={`text-fluid-xs flex items-center justify-center rounded-2xl border px-1`}
        >
          <p
            className={`text-dark-txt/80 w-fit max-w-[5rem] truncate rounded-full px-1 py-0.5 text-center font-medium first-letter:capitalize sm:max-w-[10rem] md:px-2`}
          >
            {categories?.name || "Uncategorized"}
          </p>
        </div> */}
      </div>

      <div className="mt-1 ml-4 flex h-full w-full items-center justify-end gap-2 md:mt-0">
        {/* tx amount and date */}
        <div className={`flex flex-col items-end font-semibold`}>
          {/* tx amount */}
          <p
            className={`text-fluid-sm text-center text-nowrap tabular-nums ${isDeposit ? "text-[#477d59]" : "text-[#ad383a]"} `}
          >
            {(isDeposit ? "+" : "-") + getformattedAmount(amount)}
          </p>
          {/* tx date */}
          <p className="text-dark-txt/50 text-fluid-xs font-medium">
            {getformattedDate(created_at, country)}
          </p>
        </div>

        {/* edit/delete modal */}
        {!isRecentList && (
          <div className="text-dark-txt/50 text-fluid-base">
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                <RxDotsVertical />
              </PopoverTrigger>
              <PopoverContent className="w-30 overflow-hidden rounded-2xl p-0 text-xs text-gray-600">
                <ul>
                  <li
                    onClick={() => deleteTransaction?.(id)}
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
        )}
      </div>
    </div>
  );
};

export default TransactionRowData;
