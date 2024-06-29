import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export const useCreateGuest = () => {
  const queryClient = useQueryClient();

  const { mutate: createGuestMutate, isPending: isAdding } = useMutation({
    mutationFn: createGuest,
    onSuccess: () => {
      toast.success("Guest created successfully");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createGuestMutate, isAdding };
};
