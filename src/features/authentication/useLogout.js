import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logOutMutation, isPending: isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Sorry, Could not log out!");
    },
  });

  return { logOutMutation, isLoading };
};
