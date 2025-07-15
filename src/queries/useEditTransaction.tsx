import { editTransaction } from "@/api/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction"],
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
