import { updateUserCurrency } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type mutationType = {
  newCurrency: string;
};

export const useUpdateUserCurrency = (user_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user-currency", user_id],
    mutationFn: ({ newCurrency }: mutationType) =>
      updateUserCurrency({ user_id, newCurrency }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-currency", user_id] });
    },
  });
};
