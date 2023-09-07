import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
        queryClient.setQueriesData(["user"], null);
      toast.success("Logout successful");
      navigate("/login", { replace: true });
    },
  });

    return { logout, isLoading };
}
