import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking has been deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("Booking could not be deleted");
    },
  });

  return { deleteBookingMutate, isDeleting };
};
