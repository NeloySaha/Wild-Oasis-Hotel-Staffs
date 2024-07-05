import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editBooking } from "../../services/apiBookings";

export const useEditBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: editEditBookingMutate, isPending: isEditing } = useMutation({
    mutationFn: editBooking,
    onSuccess: () => {
      toast.success("Booking edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editEditBookingMutate, isEditing };
};
