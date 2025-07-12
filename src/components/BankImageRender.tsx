import { useSignedImageUrl } from "../queries/useSignedImageUrl";

const BankImageRender = ({ path }: { path: string }) => {
  const { data: signedUrl, isError, isLoading } = useSignedImageUrl(path);

  if (isError) return <div>Failed to load image</div>;

  return isLoading ? (
    <div className="bg-dark-background/50 min-h-8 min-w-8 shrink-0 animate-pulse rounded-xl md:min-h-12 md:min-w-12" />
  ) : (
    <img
      src={signedUrl || "/fallback.png"}
      alt="Bank Avatar"
      className="bg-dark-background/50 min-h-8 w-full min-w-8 shrink-0 rounded-xl object-cover md:min-h-12 md:min-w-12"
    />
  );
};

export default BankImageRender;
