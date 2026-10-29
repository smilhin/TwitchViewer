import type {FastifyInstance} from "fastify";
import {getCurrentUser} from "../lib/auth";
import {addStreamer, deleteStreamer} from "../services/streamers";
import {CHANNEL, FILE, getRecordings, getStreamerSummaries} from "../services/recordings";
import {createReadStream} from "node:fs";
import {stat} from "node:fs/promises";
import {join, resolve} from "node:path";
import {config} from "../config";


const RECORDINGS_DIR = resolve(config.recordingsDir);

export async function streamerRoutes(app: FastifyInstance) {
    app.get("/api/streamers", (req, reply) => {
        const user = getCurrentUser(req);
        if (!user) return reply.code(401).send({error: "Not logged in"});

        return getStreamerSummaries(user.streamers);
    });

    app.post<{ Body: { channelName: string } }>(
        "/api/streamers",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["channelName"],
                    properties: {
                        channelName: {type: "string", pattern: "^[a-zA-Z0-9_]{1,25}$"},
                    },
                },
            },
        },
        async (req, reply) => {
            const user = getCurrentUser(req);
            if (!user) return reply.code(401).send({error: "Not logged in"});

            const result = addStreamer(user.id, req.body.channelName);
            if (!result) {
                return reply.code(409).send({error: `Already subscribed to ${req.body.channelName.toLowerCase()}`});
            }
            return reply.code(201).send(result);
        },
    );

    app.delete<{ Body: { channelName: string } }>(
        "/api/streamers",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["channelName"],
                    properties: {
                        channelName: {type: "string", pattern: "^[a-zA-Z0-9_]{1,25}$"},
                    },
                },
            },
        },
        async (req, reply) => {
            const user = getCurrentUser(req);
            if (!user) return reply.code(401).send({error: "Not logged in"});

            const result = deleteStreamer(user.id, req.body.channelName);
            if (!result) {
                return reply.code(409).send({error: `Streamer ${req.body.channelName.toLowerCase()} not found`});
            }
            return reply.code(200).send(result);
        },
    );

    app.get<{ Params: { streamer: string; recording: string } }>(
        "/api/recordings/:streamer/:recording",
        async (req, reply) => {
            const user = getCurrentUser(req);
            if (!user) return reply.code(401).send({error: "Not logged in"});

            const {streamer, recording} = req.params;

            if (!CHANNEL.test(streamer) || !FILE.test(recording)) {
                return reply.code(400).send({error: "Invalid streamer or recording"});
            }
            if (!user.streamers.includes(streamer)) {
                return reply.code(403).send({error: "Not subscribed to this streamer"});
            }

            const path = join(RECORDINGS_DIR, streamer, recording);

            let size: number;
            try {
                size = (await stat(path)).size;
            } catch {
                return reply.code(404).send({error: "Recording not found"});
            }

            reply.header("Accept-Ranges", "bytes").type("video/mp4");

            const range = req.headers.range;
            if (!range) {
                return reply.header("Content-Length", size).send(createReadStream(path));
            }

            const m = /^bytes=(\d*)-(\d*)$/.exec(range);
            if (!m || (m[1] === "" && m[2] === "")) {
                return reply.code(416).header("Content-Range", `bytes */${size}`).send();
            }

            let start: number;
            let end: number;
            if (m[1] === "") {
                start = Math.max(size - Number(m[2]), 0);
                end = size - 1;
            } else {
                start = Number(m[1]);
                end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
            }

            if (start > end || start >= size) {
                return reply.code(416).header("Content-Range", `bytes */${size}`).send();
            }

            return reply
                .code(206)
                .header("Content-Range", `bytes ${start}-${end}/${size}`)
                .header("Content-Length", end - start + 1)
                .send(createReadStream(path, {start, end}));
        },
    );

    app.get<{ Params: { streamer: string } }>("/api/streamers/:streamer/recordings", async (req, reply) => {
        const user = getCurrentUser(req);
        if (!user) return reply.code(401).send({error: "Not logged in"});
        if (!user.streamers.includes(req.params.streamer)) {
            return reply.code(403).send({error: "Not subscribed to this streamer"});
        }
        return getRecordings(req.params.streamer);
    });
}