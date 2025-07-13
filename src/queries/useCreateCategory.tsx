import { createCategory } from "@/api/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCategory = (user_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", user_id] });
    },
  });
};
