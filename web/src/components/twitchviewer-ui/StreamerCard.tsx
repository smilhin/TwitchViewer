import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {Streamer} from "@twitchviewer/shared/src/types.ts";
import {Link} from "react-router-dom";
import {Badge} from "@/components/ui/badge.tsx";

export function StreamerCard({username}: Streamer) {
    return (
        <Card className={"m-5 mx-auto"}>
            <Link to={`/watch?streamer=${username}&file=${username}`}>
                <div className={"aspect-video bg-muted rounded-4xl m-2"}>
                    <img src="../../../public/logo.png" alt="streamer.logo"
                         className="h-full w-full object-cover rounded-4xl"
                         loading="lazy"/>
                </div>
            </Link>
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-1">
                    {username}
                    <Badge variant="secondary">{"21 streamers"}</Badge>
                </CardTitle>
                <CardDescription>Latest: {new Date().toLocaleDateString()}</CardDescription>
            </CardHeader>

        </Card>
    );
}