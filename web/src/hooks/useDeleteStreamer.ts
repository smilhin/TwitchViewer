import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteStreamer} from "@/api/streamers.ts";
import type {User} from "@twitchviewer/shared/src/types.ts";

export function useDeleteStreamer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteStreamer,
        onSuccess: ({channelName}) => {
            queryClient.setQueryData<User | null>(["me"], (old) =>
                old && old.streamers.includes(channelName)
                    ? {
                        ...old, streamers: old.streamers.filter(
                            (channel) => channel !== channelName
                        ),
                    }
                    : old
            );
        },
    });
}