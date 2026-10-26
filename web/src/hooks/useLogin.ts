import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {login} from "@/api/auth";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            queryClient.setQueryData(["me"], user);
            navigate("/");
        },
    });
}