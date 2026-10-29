import {errorMessage} from "@/api/auth.ts";

export type Recording = { file: string; startedAt: string };

export async function getRecordings(streamer: string): Promise<Recording[]> {
    const response = await fetch(`/api/streamers/${streamer}/recordings`);
    if (!response.ok) throw new Error(await errorMessage(response, "Could not load recordings"));
    return response.json();
}