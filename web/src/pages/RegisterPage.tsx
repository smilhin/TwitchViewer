import {useState} from "react";
import {SignupForm} from "@/components/twitchviewer-ui/signup-form";
import {useSignup} from "@/hooks/useSignup";

export function RegisterPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [mismatch, setMismatch] = useState(false);
    const {mutate, isPending, error} = useSignup();

    function handleSubmit() {
        if (password !== confirm) return setMismatch(true);
        setMismatch(false);
        mutate({name, password});
    }

    return (
        <div className="flex min-h-screen items-center justify-end p-10">
            <div className="flex w-full max-w-sm flex-col">
                <SignupForm
                    name={name} setName={setName}
                    password={password} setPassword={setPassword}
                    confirm={confirm} setConfirm={setConfirm}
                    onSubmit={handleSubmit}
                    isPending={isPending}
                    error={mismatch ? "Passwords do not match" : error?.message}
                />
            </div>
        </div>
    );
}