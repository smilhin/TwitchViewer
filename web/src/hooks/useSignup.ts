import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {signup} from "@/api/auth";

export function useSignup() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: signup,
        onSuccess: (user) => {
            queryClient.setQueryData(["me"], user);
            navigate("/");
        },
    });
}