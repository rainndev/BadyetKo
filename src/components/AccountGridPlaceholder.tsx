import { IoClose } from "react-icons/io5";
import AccountImage from "@/components/ui/AccountImage";

const AccountGridPlaceholder = () => {
  return (
    <div
      className={`bg-dark-background/50 relative flex w-full animate-pulse cursor-pointer flex-col items-start justify-center rounded-xl p-5 md:rounded-2xl md:p-7`}
    >
      <div className="invisible flex w-full items-center justify-start gap-5">
        <div className="flex size-8 items-center justify-center">
          <AccountImage custom_account_avatar={""} />
        </div>
      </div>
      <div
        className={`bg-light-background text-dark-background/40 invisible absolute -top-3 -right-3 rounded-full p-2`}
      >
        <IoClose />
      </div>
      <p className="text-dark-txt text-fluid-sm invisible mt-5 max-w-fit truncate tabular-nums">
        19000
      </p>
      <p className="text-fluid-xs text-dark-txt/50 invisible max-w-full truncate">
        test name
      </p>
    </div>
  );
};

export default AccountGridPlaceholder;
