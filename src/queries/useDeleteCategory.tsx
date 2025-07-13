import { removeCategory } from "@/api/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCategory = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category", user_id],
      });
    },
  });
};
