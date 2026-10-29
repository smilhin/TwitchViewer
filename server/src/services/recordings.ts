import {readdir, stat} from "node:fs/promises";
import {join} from "node:path";
import type {Streamer} from "@twitchviewer/shared";
import {config} from "../config.js";

export const CHANNEL = /^[a-z0-9_]{1,25}$/;
export const FILE = /^[a-z0-9_]+_(\d{4}-\d{2}-\d{2})_(\d{2})-(\d{2})-(\d{2})\.mp4$/;

export type Recording = { file: string; startedAt: string };

async function scan(channel: string) {
    const empty = {files: [] as { file: string; startedAt: string }[], isStreaming: false};
    if (!CHANNEL.test(channel)) return empty;

    let names: string[];
    try {
        names = await readdir(join(config.recordingsDir, channel));
    } catch (err: any) {
        if (err.code === "ENOENT") return empty;
        throw err;
    }

    const files = names
        .flatMap((file) => {
            const m = FILE.exec(file);
            return m ? [{file, startedAt: `${m[1]}T${m[2]}:${m[3]}:${m[4]}`}] : [];
        })
        .sort((a, b) => b.startedAt.localeCompare(a.startedAt));

    return {files, isStreaming: names.some((n) => n.endsWith(".mp4frag"))};
}

export async function getRecordings(channel: string): Promise<Recording[]> {
    return (await scan(channel)).files;
}

export async function getStreamerSummaries(channels: string[]): Promise<Streamer[]> {
    console.log(config.recordingsDir);
    return Promise.all(
        channels.map(async (username) => {
            const {files, isStreaming} = await scan(username);
            const newest = files[0];

            return {
                username,
                recordingCount: files.length,
                isStreaming,
                latest: newest
                    ? {
                        ...newest,
                        sizeBytes: (await stat(join(config.recordingsDir, username, newest.file))).size,
                    }
                    : null,
            };
        }),
    );
}