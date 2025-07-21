import { useCurrencyStore } from "@/store/CurrencyStore";
import type { BankListTypes } from "@/types/bank.types";
import { useNavigate } from "react-router-dom";
import BankImage from "@/components/ui/BankImage";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

type BankGridDataProps = {
  bankItemData: BankListTypes;
  removeBank: (params: { bankID: string; avatarFilePath: string }) => void;
  isTrashEnabled: boolean;
  setTrashEnabled: (value: boolean) => void;
};

const BankGridData = ({
  bankItemData,
  removeBank,
  isTrashEnabled,
  setTrashEnabled,
}: BankGridDataProps) => {
  const navigate = useNavigate();
  const getformattedAmount = useCurrencyStore(
    (state) => state.getformattedAmount,
  );
  const { id, balance, custom_bank_avatar, name } = bankItemData;

  const handleDeleteBank = () => {
    setTrashEnabled(false);
    removeBank({
      bankID: id,
      avatarFilePath: custom_bank_avatar as string,
    });
  };

  return (
    <motion.div
      layout
      initial={{ rotate: 0 }}
      animate={{ rotate: isTrashEnabled ? [-2, 2, -2, 2, 0] : 0 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        repeat: isTrashEnabled ? Infinity : 0,
        repeatDelay: 1,
      }}
      onClick={() => !isTrashEnabled && navigate(`/bank/${id}`)}
      className={`bg-dark-background hover:bg-dark-background/10 relative flex w-full cursor-pointer flex-col items-start justify-center rounded-xl p-5 md:rounded-2xl md:p-7`}
    >
      <div className="flex w-full items-center justify-start gap-5">
        <div className="flex size-8 items-center justify-center">
          <BankImage custom_bank_avatar={custom_bank_avatar ?? ""} />
        </div>
      </div>
      {isTrashEnabled && (
        <div
          onClick={handleDeleteBank}
          className={`bg-light-background text-dark-background absolute -top-3 -right-3 rounded-full p-2`}
        >
          <IoClose />
        </div>
      )}
      <p className="text-light-background text-fluid-sm mt-5 max-w-fit truncate tabular-nums">
        {getformattedAmount(balance ?? 0)}
      </p>
      <p className="text-fluid-xs text-light-background/50 max-w-full truncate">
        {name}
      </p>
    </motion.div>
  );
};

export default BankGridData;
