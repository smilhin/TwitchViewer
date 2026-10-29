import {useQuery} from "@tanstack/react-query";
import {getStreamers} from "@/api/streamers.ts";

export function useStreamers() {
    return useQuery({
        queryKey: ["streamers"],
        queryFn: getStreamers,
        refetchInterval: 30_000,
    })
}