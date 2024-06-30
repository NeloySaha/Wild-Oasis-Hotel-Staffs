import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteGuestMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteGuest,
    onSuccess: () => {
      toast.success("Guest deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteGuestMutate, isDeleting };
};
