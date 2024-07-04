import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: createBookingMutate, isPending: isAdding } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking created successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createBookingMutate, isAdding };
};
