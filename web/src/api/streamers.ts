import {errorMessage} from "@/api/auth.ts";
import type {Streamer} from "@twitchviewer/shared/src/types.ts";

export async function getStreamers(): Promise<Streamer[]> {
    const response = await fetch("/api/streamers");
    if (!response.ok) throw new Error(await errorMessage(response, "Could not load streamers"));
    return response.json();
}

export async function addStreamer(channelName: string): Promise<{ channelName: string }> {
    const response = await fetch("/api/streamers", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({channelName}),
    });
    if (!response.ok) throw new Error(await errorMessage(response, "Could not add streamer"));
    return response.json();
}

export async function deleteStreamer(channelName: string): Promise<{ channelName: string }> {
    const response = await fetch("/api/streamers", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({channelName}),
    });
    if (!response.ok) throw new Error(await errorMessage(response, "Could not delete streamer"));
    return response.json();
}