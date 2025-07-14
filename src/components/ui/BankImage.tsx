import { useSignedImageUrl } from "@/queries/useSignedImageUrl";
import { FaPiggyBank } from "react-icons/fa6";

const BankImage = ({ custom_bank_avatar }: { custom_bank_avatar: string }) => {
  const {
    data: signedUrl,
    isError,
    isLoading,
  } = useSignedImageUrl(custom_bank_avatar);

  if (isError) return <div>Failed to load image</div>;

  return isLoading ? (
    <div className="bg-dark-background/50 min-h-10 min-w-10 shrink-0 animate-pulse rounded-xl md:min-h-12 md:min-w-12" />
  ) : signedUrl ? (
    <img
      src={signedUrl}
      alt="Bank Avatar"
      className="bg-dark-background/10 border-dark-background/5 min-h-10 w-full min-w-10 shrink-0 rounded-xl border object-cover md:min-h-12 md:min-w-12"
    />
  ) : (
    <div className="bg-dark-background/3 border-dark-background/5 flex min-h-10 w-full min-w-10 shrink-0 items-center justify-center rounded-xl border md:min-h-12 md:min-w-12">
      <FaPiggyBank className="text-dark-txt/20 h-8 w-8 md:h-8 md:w-8" />
    </div>
  );
};

export default BankImage;
