import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, status } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: (error: any) => {
      toast.error("Signup failed. Please try again.", error);
    },
  });
  const isLoading = status === "pending" ? true : false;

  return { signup, isLoading };
}
