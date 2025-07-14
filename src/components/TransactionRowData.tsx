import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrencyStore } from "@/store/CurrencyStore";
import { useDateTimeStore } from "@/store/DateTimeStore";
import type { TransactionListTypes } from "@/types/transaction.types";
import { BsThreeDots } from "react-icons/bs";
import { CiStickyNote } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { PiTrashSimple } from "react-icons/pi";

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

  const handleEdit = () => {
    setSelectedItem(dataItem);
    setEditOpen(true);
  };

  return (
    <tr className="hover:bg-dark-background/10 bg-dark-background/3 w-full transition-colors ease-in-out">
      {/* tx date */}
      <td className="text-dark-txt/70 rounded-l-2xl p-5 pl-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)] font-semibold text-nowrap">
        {getformattedDate(dataItem.created_at, country)}
        <p className="text-dark-txt/50 text-[clamp(.6rem,2vw+.6rem,0.75rem)]">
          Date
        </p>
      </td>

      {/* tx amount */}

      <td className="max-w-xs truncate p-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)]">
        <p className="text-dark-txt/70">{dataItem.name}</p>
        <p className="text-dark-txt/50 w-fit rounded-lg text-[clamp(.6rem,2vw+.6rem,0.75rem)]">
          Name
        </p>
      </td>

      {/* tx amount */}
      <td
        className={`p-5 text-[clamp(.4rem,2vw+.4rem,0.875rem)] font-semibold ${dataItem.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"}`}
      >
        <p className="text-nowrap tabular-nums">
          {(dataItem.type === "deposit" ? "+" : "-") +
            getformattedAmount(dataItem.amount)}
        </p>
      </td>

      {/* tx category */}
      <td className="max-w-xs truncate p-4 py-2 text-sm">
        <p className="text-dark-txt/70">{dataItem.categories?.name || "--"}</p>
        <p className="text-dark-txt/50 w-fit rounded-lg text-[clamp(.6rem,2vw+.6rem,0.75rem)]">
          Category
        </p>
      </td>

      {/* tx note */}
      <td className="max-w-xs truncate p-4 py-2 text-sm">
        <p className="text-dark-txt/70">{dataItem.note || "--"}</p>
        <p className="text-dark-txt/50 flex w-fit items-center gap-1 rounded-lg text-[clamp(.6rem,2vw+.6rem,0.75rem)]">
          <span>Note</span>
          <CiStickyNote />
        </p>
      </td>

      {/* tx type */}
      <td className="flex items-center justify-start p-4 py-2 text-[clamp(.5rem,1vw+.5rem,0.75rem)] text-gray-600">
        <div className="flex items-center justify-start p-5 pr-2 text-[clamp(.5rem,1vw+.5rem,0.75rem)] text-gray-600">
          <span className="relative flex size-3 items-center justify-center">
            <span
              className={`${dataItem.type === "deposit" ? "bg-green-300" : "bg-red-300"} absolute inline-flex h-full w-full animate-ping rounded-full opacity-75`}
            />
            <span
              className={`${dataItem.type === "deposit" ? "bg-green-600" : "bg-red-500"} relative inline-flex size-2 rounded-full`}
            ></span>
          </span>

          <p
            className={`w-fit rounded-full px-3 py-1 font-medium first-letter:capitalize ${dataItem.type === "deposit" ? "text-[#477d59]" : "text-[#ad383a]"}`}
          >
            {dataItem.type}
          </p>
        </div>
      </td>

      {/* tx edit/delete */}
      <td className="rounded-r-2xl p-4 py-2 text-sm text-gray-600">
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
                onClick={handleEdit}
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
  );
};

export default TransactionRowData;
