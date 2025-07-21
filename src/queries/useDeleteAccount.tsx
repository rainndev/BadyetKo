import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAccount } from "../api/account";

export const useDeleteAccount = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts", user_id],
      });
      queryClient.invalidateQueries({ queryKey: ["users", user_id] });
      queryClient.invalidateQueries({ queryKey: ["area-chart-data"] });
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      queryClient.invalidateQueries({ queryKey: ["category-pie-data"] });
    },
  });
};
