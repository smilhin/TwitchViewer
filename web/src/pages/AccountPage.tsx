import {getMe} from "@/api/auth.ts";
import type {User} from "@twitchviewer/shared/src/types.ts";
import {useEffect, useState} from "react";
import {Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle} from "@/components/ui/item.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export function AccountPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getMe().then(setUser).catch(console.error).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>{">~<"}</p>;
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
                <ItemGroup>
                    <Item>
                        <ItemContent>
                            <ItemHeader>Your Streamers</ItemHeader>
                            {user.streamers.map((streamer) => (
                                <ItemDescription>{streamer}</ItemDescription>
                            ))}
                        </ItemContent>
                    </Item>
                </ItemGroup>
            </Item>
        </div>
    );
}