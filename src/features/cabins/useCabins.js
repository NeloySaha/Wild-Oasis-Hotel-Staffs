import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useCabins = () => {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
};
