import {useState} from "react";
import {LoginForm} from "@/components/twitchviewer-ui/login-form";
import {useLogin} from "@/hooks/useLogin.ts";

export function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const {mutate, isPending, error} = useLogin();

    return (
        <div className="flex min-h-screen items-center justify-end p-10">
            <div className="flex w-full max-w-sm flex-col">
                <LoginForm
                    name={name}
                    setName={setName}
                    password={password}
                    setPassword={setPassword}
                    onSubmit={() => mutate({name, password})}
                    isPending={isPending}
                    error={error?.message}
                />
            </div>
        </div>
    );
}