import {useQuery} from "@tanstack/react-query";
import {getRecordings} from "@/api/recordings.ts";

export function useRecordings(streamer: string) {
    return useQuery({
        queryKey: ["recordings", streamer],
        queryFn: () => getRecordings(streamer),
        enabled: streamer !== "",
    });
}
