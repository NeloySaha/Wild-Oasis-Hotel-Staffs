import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export const useEditGuest = () => {
  const queryClient = useQueryClient();

  const { mutate: editGuestMutate, isPending: isEditing } = useMutation({
    mutationFn: editGuest,
    onSuccess: () => {
      toast.success("Guest edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editGuestMutate, isEditing };
};
