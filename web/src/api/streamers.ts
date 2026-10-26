import type {Streamer} from "@twitchviewer/shared";


export async function getStreamers(): Promise<Streamer[]> {
    const response = await fetch(`/api/streamers`, {});
    if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
    }
    return await response.json();
}