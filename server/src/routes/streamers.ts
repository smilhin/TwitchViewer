import type {FastifyInstance} from "fastify";
import {getCurrentUser} from "../lib/auth";
import {addStreamer, deleteStreamer} from "../services/streamers";


export async function streamerRoutes(app: FastifyInstance) {
    app.get("/api/streamers", (req, reply) => {
        const user = getCurrentUser(req);
        if (!user) return reply.code(401).send({error: "Not logged in"});

        return user.streamers;
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
}