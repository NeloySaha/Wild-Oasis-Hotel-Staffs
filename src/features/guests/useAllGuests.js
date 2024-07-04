import { useQuery } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";

export const useAllGuests = () => {
  const { data: guests, isLoading } = useQuery({
    queryKey: ["allGuests"],
    queryFn: getAllGuests,
  });

  return { guests, isLoading };
};
