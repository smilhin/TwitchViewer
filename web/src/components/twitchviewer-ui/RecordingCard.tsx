import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Link} from "react-router-dom";
import type {Recording} from "@/api/recordings.ts";

const THUMBNAIL_COUNT = 4;

type RecordingCardProps = {
    streamer: string;
    recording: Recording;
};

export function RecordingCard({streamer, recording}: RecordingCardProps) {
    const base = recording.file.replace(/\.mp4$/, "");
    const [date, time = ""] = recording.startedAt.split("T");

    const params = new URLSearchParams({streamer, file: recording.file});

    return (
        <Card className={"m-5 mx-auto"}>
            <Link to={`/watch?${params}`}>
                <div
                    className={"grid aspect-video grid-cols-2 grid-rows-2 gap-1 overflow-hidden bg-muted rounded-4xl m-2"}>
                    {Array.from({length: THUMBNAIL_COUNT}, (_, i) => (
                        <img
                            key={i}
                            src={`/api/thumbnail/${encodeURIComponent(streamer)}/${encodeURIComponent(`${base}_thumb_${i + 1}.png`)}`}
                            alt={`${date} thumbnail ${i + 1}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                                const img = e.currentTarget;
                                img.onerror = null;
                                img.src = "/logo.png";
                            }}
                        />
                    ))}
                </div>
            </Link>
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-1">
                    {date}
                    <Badge variant="secondary">{time.slice(0, 5)}</Badge>
                </CardTitle>
                <CardDescription className="truncate">{recording.file}</CardDescription>
            </CardHeader>
        </Card>
    );
}