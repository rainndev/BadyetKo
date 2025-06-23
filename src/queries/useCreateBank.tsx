import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBank } from "../api/bank";

export const useCreateBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
  });
};
