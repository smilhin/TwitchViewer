import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {Streamer} from "@twitchviewer/shared/src/types.ts";
import {Link} from "react-router-dom";
import {Badge} from "@/components/ui/badge.tsx";

type StreamerCardProps = {
    streamer: Streamer;
};

export function StreamerCard({streamer}: StreamerCardProps) {
    const params = new URLSearchParams({
        streamer: streamer.username,
        file: streamer.latest?.file ?? "",
    });

    return (
        <Card className={"m-5 mx-auto"} key={streamer.username}>
            <Link to={`/watch?${params}`}>
                <div className={"aspect-video bg-muted rounded-4xl m-2"}>
                    <img src="../../../public/logo.png" alt="streamer.logo"
                         className="h-full w-full object-cover rounded-4xl"
                         loading="lazy"/>
                </div>
            </Link>
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-1">
                    {streamer.username}
                    <Badge variant="secondary">{streamer.recordingCount} streams</Badge>
                </CardTitle>
                <CardDescription>Latest: {streamer.latest?.startedAt.match(/^\d{4}-\d{2}-\d{2}/)?.[0]}</CardDescription>
            </CardHeader>

        </Card>
    );
}