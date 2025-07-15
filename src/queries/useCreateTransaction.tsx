import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../api/transactions";

export const useCreateTransaction = (bankID: string, userID: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction", bankID] });
      queryClient.invalidateQueries({ queryKey: ["banks", userID] });
      queryClient.invalidateQueries({ queryKey: ["users", userID] });
    },
  });
};
