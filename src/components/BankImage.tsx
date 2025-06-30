import { useSignedImageUrl } from "../queries/useSignedImageUrl";

const BankImage = ({ path }: { path: string }) => {
  const { data: signedUrl, isError, isLoading } = useSignedImageUrl(path);

  if (isLoading) return <div>Loading image...</div>;
  if (isError) return <div>Failed to load image</div>;
  return (
    <img
      src={signedUrl || "/fallback.png"}
      alt="Bank Avatar"
      className="size-10 object-cover bg-dark-background/3 rounded-lg"
    />
  );
};

export default BankImage;
