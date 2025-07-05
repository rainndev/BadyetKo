import { editTransaction } from "@/api/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTransaction = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction", user_id],
      });
    },
  });
};
