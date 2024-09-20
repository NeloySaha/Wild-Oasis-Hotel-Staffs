import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const { mutate: signUpMutation, isPending: isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Your account is created successfully!");
      navigate("/dashboard");
    },
  });

  return { signUpMutation, isLoading };
};
