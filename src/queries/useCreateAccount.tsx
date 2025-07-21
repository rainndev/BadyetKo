import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount } from "../api/account";

export const useCreateAccount = (user_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts", user_id] });
    },
  });
};
