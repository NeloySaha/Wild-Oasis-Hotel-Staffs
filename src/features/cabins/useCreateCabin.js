import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabinMutate, isPending: isAdding } = useMutation({
    mutationFn: addEditCabins,
    onSuccess: () => {
      toast.success("Cabin Added Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabinMutate, isAdding };
};
