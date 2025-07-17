import { removeTransaction } from "@/api/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTransaction = (user_id: string, userID: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction", user_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["transaction", "All"],
      });
      queryClient.invalidateQueries({ queryKey: ["banks", userID] });
      queryClient.invalidateQueries({ queryKey: ["users", userID] });
      queryClient.invalidateQueries({ queryKey: ["area-chart-data"] });
      queryClient.invalidateQueries({ queryKey: ["category-pie-data"] });
      queryClient.invalidateQueries({ queryKey: ["bank-net-balance"] });
    },
  });
};
