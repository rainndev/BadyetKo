import { removeTransaction } from "@/api/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTransaction = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction", user_id],
      });
    },
  });
};
