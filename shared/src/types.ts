export type User = {
    id: string;
    name: string;
    streamers: string[];
}

export type Streamer = {
    username: string;
    recordingCount: number;
    isStreaming: boolean;   // an unfinished .mp4frag exists right now
    latest: { file: string; startedAt: string; sizeBytes: number } | null;
};