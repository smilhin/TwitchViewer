import type {ComponentProps, SyntheticEvent} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";

type SignupFormProps = Omit<ComponentProps<typeof Card>, "onSubmit"> & {
    name: string; setName: (v: string) => void;
    password: string; setPassword: (v: string) => void;
    confirm: string; setConfirm: (v: string) => void;
    onSubmit: () => void;
    isPending?: boolean;
    error?: string;
};

export function SignupForm({
                               name, setName, password, setPassword, confirm, setConfirm,
                               onSubmit, isPending, error, ...props
                           }: SignupFormProps) {
    function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Pick a name and a password</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)}
                                   autoComplete="username" required/>
                            <FieldDescription>3-32 characters: letters, digits, underscore.</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   autoComplete="new-password" required/>
                            <FieldDescription>At least 8 characters.</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm">Confirm password</FieldLabel>
                            <Input id="confirm" type="password" value={confirm}
                                   onChange={(e) => setConfirm(e.target.value)}
                                   autoComplete="new-password" required/>
                        </Field>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Field>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating..." : "Create account"}
                            </Button>
                            <FieldDescription className="text-center">
                                Already have an account? <Link to="/login">Sign in</Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}