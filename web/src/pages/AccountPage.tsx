import {type SyntheticEvent, useState} from "react";
import {Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle} from "@/components/ui/item.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Field, FieldGroup} from "@/components/ui/field.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useDeleteStreamer} from "@/hooks/useDeleteStreamer.ts";
import {toast} from "sonner";
import {useCurrentUser} from "@/hooks/useCurrentUser.ts";

export function AccountPage() {
    const {data: user} = useCurrentUser();
    const [selectedStreamers, setSelectedStreamers] = useState<string[]>([]);
    const {mutateAsync, isPending} = useDeleteStreamer();

    function handleCheckboxChange(channel: string, checked: boolean) {
        setSelectedStreamers((prev) =>
            checked
                ? [...prev, channel]
                : prev.filter((name) => name !== channel)
        );
    }

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (selectedStreamers.length === 0) {
            toast.info("Select at least one streamer");
            return;
        }

        const results = await Promise.allSettled(selectedStreamers.map((c) => mutateAsync(c)));
        const failed = results.filter((r) => r.status === "rejected").length;

        if (failed === 0) toast.success("Unsubscribed successfully");
        else toast.error(`${failed} streamer(s) could not be removed`);
        setSelectedStreamers([]);
    }

    if (!user) {
        return <p>Please log in</p>;
    }

    return (
        <div className="flex w-full max-w-md flex-col gap-6 justify-center">
            <Item variant={"outline"}>
                <ItemContent>
                    <ItemTitle>Your Profile</ItemTitle>
                </ItemContent>
                <ItemDescription>
                    hewo kimka ;3
                </ItemDescription>
                <Separator/>
                <ItemGroup>
                    <Item variant={"outline"} className="w-full">
                        <ItemContent className="">
                            <ItemHeader>Name</ItemHeader>
                            <ItemDescription>{user.name}</ItemDescription>
                        </ItemContent>
                    </Item>
                    <Item variant={"outline"} className="w-full">
                        <ItemContent className="">
                            <ItemHeader>Kimka</ItemHeader>
                            <ItemDescription>{user.id}</ItemDescription>
                        </ItemContent>
                    </Item>
                </ItemGroup>
                <Separator/>
                <div className={"flex flex-row w-full justify-end"}>
                    <ItemGroup>
                        <Item>
                            <ItemContent>
                                <ItemHeader>Your Streamers</ItemHeader>
                                {user.streamers.map((streamer) => (
                                    <ItemDescription key={streamer}>{streamer}</ItemDescription>
                                ))}
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                    <Popover>
                        <PopoverTrigger
                            render={<Button className={"my-2 h-10"} variant="outline"
                                            disabled={user.streamers.length === 0}>Unsubscribe</Button>}/>
                        <PopoverContent className="w-80">
                            <form onSubmit={handleSubmit}>
                                <FieldGroup className="max-w-sm">
                                    {user.streamers.map((streamer) => (
                                        <Field key={streamer} orientation="horizontal">
                                            <Checkbox
                                                id={`checkbox-unsubscribe-${streamer}`}
                                                checked={selectedStreamers.includes(streamer)}
                                                onCheckedChange={(checked) =>
                                                    handleCheckboxChange(streamer, checked)
                                                }
                                            />
                                            <Label htmlFor={`checkbox-unsubscribe-${streamer}`}>{streamer}</Label>
                                        </Field>
                                    ))}
                                </FieldGroup>
                                <Button
                                    type="submit"
                                    disabled={isPending || selectedStreamers.length === 0}
                                    className={"mt-3"}
                                >
                                    {isPending ? "Unsubscribing..." : "Unsubscribe"}
                                </Button>
                            </form>
                        </PopoverContent>
                    </Popover>
                </div>
            </Item>
        </div>
    );
}