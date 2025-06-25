import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAvatar } from "../api/avatar-bucket";

export const useCreateAvatar = (image: File | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["custom-avatar-bucket", image],
      });
    },
  });
};
