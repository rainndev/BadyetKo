import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../api/transactions";

export const useCreateTransaction = (userID: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      queryClient.invalidateQueries({ queryKey: ["banks", userID] });
      queryClient.invalidateQueries({ queryKey: ["users", userID] });
      queryClient.invalidateQueries({ queryKey: ["area-chart-data"] });
    },
  });
};
