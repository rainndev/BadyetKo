import { FaPiggyBank } from "react-icons/fa6";
import BankImageRender from "../BankImageRender";

const BankImage = ({ custom_bank_avatar }: { custom_bank_avatar: string }) => {
  return custom_bank_avatar ? (
    <BankImageRender path={custom_bank_avatar} />
  ) : (
    <FaPiggyBank className="text-dark-background text-4xl" />
  );
};

export default BankImage;
