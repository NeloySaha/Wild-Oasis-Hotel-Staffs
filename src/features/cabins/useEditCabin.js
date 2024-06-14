import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabinMutate, isPending: isEditing } = useMutation({
    mutationFn: ({ cabinData, editId }) => addEditCabins(cabinData, editId),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabinMutate, isEditing };
};
