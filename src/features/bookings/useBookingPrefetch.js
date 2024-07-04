import { useQueryClient } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";
import { getCabins } from "../../services/apiCabins";

export const useBookingPrefetch = () => {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  queryClient.prefetchQuery({
    queryKey: ["allGuests"],
    queryFn: getAllGuests,
  });
};
