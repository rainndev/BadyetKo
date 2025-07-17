import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../api/transactions";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["area-chart-data"] });
      queryClient.invalidateQueries({ queryKey: ["category-pie-data"] });
      queryClient.invalidateQueries({ queryKey: ["bank-net-balance"] });
    },
  });
};
