import { useSignedImageUrl } from "../queries/useSignedImageUrl";

const BankImage = ({ path }: { path: string }) => {
  const { data: signedUrl, isError, isLoading } = useSignedImageUrl(path);

  if (isError) return <div>Failed to load image</div>;
  return isLoading ? (
    <div className="bg-dark-background/50 min-w-8 shrink-0 animate-pulse rounded-full sm:size-12" />
  ) : (
    <img
      src={signedUrl || "/fallback.png"}
      alt="Bank Avatar"
      className="bg-dark-background/50 min-w-8 shrink-0 rounded-full object-cover sm:size-12"
    />
  );
};

export default BankImage;
