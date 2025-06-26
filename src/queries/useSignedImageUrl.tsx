import { useQuery } from "@tanstack/react-query";
import { getSignedImageUrl } from "../api/getSignedImageUrl";

export const useSignedImageUrl = (path: string | null) => {
  return useQuery({
    queryKey: ["signed-url", path],
    queryFn: () => {
      if (!path) throw new Error("No path provided");
      return getSignedImageUrl(path);
    },
    enabled: !!path,
    staleTime: 1000 * 60 * 60,
  });
};
