import type {ComponentProps, SyntheticEvent} from "react";
import {Button} from "@/components/ui/button.tsx";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card.tsx";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";

type LoginFormProps = Omit<ComponentProps<typeof Card>, "onSubmit"> & {
    name: string;
    setName: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    onSubmit: () => void;
    isPending?: boolean;
    error?: string;
};

export function LoginForm({
                              name, setName, password, setPassword, onSubmit, isPending, error, ...props
                          }: LoginFormProps) {
    function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
                <CardDescription>Enter your name and password ^^</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </Field>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Field>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Signing in..." : "Sign in"}
                            </Button>
                        </Field>
                        <Field>
                            <FieldDescription
                                className="px-6 text-center">
                                No account? <a href="/register">Sign up</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}