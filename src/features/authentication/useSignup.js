import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signUpMutation, isPending: isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        "New Account created successfully! Please, verify the new account from the user's email address"
      );
    },
  });

  return { signUpMutation, isLoading };
};
