import { useSignedImageUrl } from "../queries/useSignedImageUrl";

const BankImage = ({ path }: { path: string }) => {
  const { data: signedUrl, isError, isLoading } = useSignedImageUrl(path);

  if (isError) return <div>Failed to load image</div>;
  return isLoading ? (
    <div className="bg-dark-background/50 size-10 animate-pulse rounded-full" />
  ) : (
    <img
      src={signedUrl || "/fallback.png"}
      alt="Bank Avatar"
      className="bg-dark-background/50 size-10 rounded-full object-cover"
    />
  );
};

export default BankImage;
