import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBank } from "../api/bank";

export const useDeleteBank = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeBank,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banks", user_id],
      });
      queryClient.invalidateQueries({ queryKey: ["users", user_id] });
      queryClient.invalidateQueries({ queryKey: ["area-chart-data"] });
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      queryClient.invalidateQueries({ queryKey: ["category-pie-data"] });
    },
  });
};
