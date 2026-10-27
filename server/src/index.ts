// server/src/index.ts
import Fastify from "fastify";
import cookie from "@fastify/cookie";
import {config} from "./config";
import "./db";
import {authRoutes} from "./routes/auth";
import {streamerRoutes} from "./routes/streamers";


const app = Fastify({logger: true});

app.register(cookie);

app.register(authRoutes);
app.register(streamerRoutes);

try {
    await app.listen({host: config.host, port: config.port});
} catch (err) {
    app.log.error(err);
    process.exit(1);
}