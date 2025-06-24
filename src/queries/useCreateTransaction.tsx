import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../api/transactions";

export const useCreateTransaction = (bankID: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction", bankID] });
    },
  });
};
