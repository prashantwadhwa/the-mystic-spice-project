import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success(
        "Signup successful, Please Check your inbox to verify the email address to login"
      );
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  return { signup, isLoading };
}
