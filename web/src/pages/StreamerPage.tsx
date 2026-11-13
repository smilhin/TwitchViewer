import {useSearchParams} from "react-router-dom";
import {Badge} from "@/components/ui/badge.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Empty, EmptyDescription, EmptyHeader, EmptyTitle} from "@/components/ui/empty.tsx";
import {RecordingCard} from "@/components/twitchviewer-ui/RecordingCard.tsx";
import {useRecordings} from "@/hooks/useRecordings.ts";

export function StreamerPage() {
    const [searchParams] = useSearchParams();
    const streamer = searchParams.get("streamer") ?? "";

    const {data: recordings, isPending, error} = useRecordings(streamer);

    if (!streamer) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyTitle>No streamer selected</EmptyTitle>
                    <EmptyDescription>Open this page as /streamer?streamer=name</EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <div className={"flex flex-col gap-3"}>
            <div className="flex items-center gap-3">
                <h1 className="font-heading text-2xl font-medium">{streamer}</h1>
                {recordings && <Badge variant="secondary">{recordings.length} streams</Badge>}
            </div>

            {error && <p className="text-sm text-destructive">{error.message}</p>}

            {!error && recordings?.length === 0 && (
                <Empty>
                    <EmptyHeader>
                        <EmptyTitle>No recordings yet</EmptyTitle>
                        <EmptyDescription>Recordings of {streamer} will show up here.</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {isPending
                    ? Array.from({length: 3}, (_, i) => <Skeleton key={i} className="h-56 rounded-xl"/>)
                    : recordings?.map((r) => (
                        <RecordingCard key={r.file} streamer={streamer} recording={r}/>
                    ))}
            </div>
        </div>
    );
}
 