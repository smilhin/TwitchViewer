import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addStreamer} from "@/api/streamers.ts";
import type {User} from "@twitchviewer/shared/src/types.ts";

export function useAddStreamer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addStreamer,
        onSuccess: async ({channelName}) => {
            queryClient.setQueryData<User | null>(["me"], (old) =>
                old && !old.streamers.includes(channelName)
                    ? {...old, streamers: [...old.streamers, channelName]}
                    : old
            );
            await queryClient.invalidateQueries({queryKey: ["streamers"]});
        },
    });
}