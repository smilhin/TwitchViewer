import {Input} from "@/components/ui/input.tsx";
import {Field, FieldGroup} from "@/components/ui/field.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {type SyntheticEvent, useState} from "react";
import {useAddStreamer} from "@/hooks/useAddStreamer.ts";
import {useCurrentUser} from "@/hooks/useCurrentUser.ts";
import {toast} from "sonner";

export function HomePage() {
    const {data: user} = useCurrentUser();
    const [channelName, setChannelName] = useState("");
    const {mutate, isPending, error} = useAddStreamer();

    function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const name = channelName.trim().toLowerCase();
        if (!name) return;

        if (user?.streamers.includes(name)) {
            toast.info(`You're already subscribed to ${name}`);
            return;
        }

        mutate(name, {
            onSuccess: () => {
                toast.success(`Subscribed to ${name}`);
                setChannelName("");
            },
            onError: (err) => toast.error(err.message),
        });
    }


    return (
        <div className={"mx-auto w-full max-w-md"}>
            <Card>
                <CardHeader>
                    <CardTitle>Subscribe to your streamer</CardTitle>
                    <CardDescription>Streamer's name must be correct</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup className={"flex flex-row gap-2"}>
                            <Field>
                                <Input
                                    placeholder={"Subscribe to your streamer"}
                                    value={channelName}
                                    onChange={(e) => setChannelName(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field className={"flex w-30"}>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Subscribing..." : "Subscribe"}
                                </Button>
                            </Field>
                        </FieldGroup>
                        {error && <p className="mt-2 text-sm text-destructive">{error.message}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}