import type {FastifyInstance} from "fastify";
import {getUserFromToken, login, logout, signup} from "../services/auth.js";
import {config} from "../config.js";

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 14 * 24 * 60 * 60,
    secure: config.secureCookies,
} as const;

type Credentials = { name: string; password: string };

export async function authRoutes(app: FastifyInstance) {
    app.post<{ Body: Credentials }>(
        "/api/login",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["name", "password"],
                    properties: {
                        name: {type: "string", minLength: 1, maxLength: 64},
                        password: {type: "string", minLength: 1, maxLength: 256},
                    },
                },
            },
        },
        async (req, reply) => {
            const result = await login(req.body.name, req.body.password);
            if (!result) return reply.code(401).send({error: "Invalid name or password"});

            reply.setCookie("session", result.token, cookieOptions);
            return result.user;
        },
    );

    app.post<{ Body: Credentials }>(
        "/api/signup",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["name", "password"],
                    properties: {
                        name: {type: "string", pattern: "^[a-zA-Z0-9_]{3,32}$"},
                        password: {type: "string", minLength: 8, maxLength: 256},
                    },
                },
            },
        },
        async (req, reply) => {
            const result = await signup(req.body.name, req.body.password);
            if (!result) return reply.code(409).send({error: "Name already taken"});

            reply.setCookie("session", result.token, cookieOptions);
            return reply.code(201).send(result.user);
        },
    );

    app.post("/api/logout", async (req, reply) => {
        const token = req.cookies.session;
        if (token) logout(token);

        reply.clearCookie("session", {path: "/"});
        return reply.code(204).send();
    });

    app.get("/api/me", async (req, reply) => {
        const token = req.cookies.session;
        const user = token ? getUserFromToken(token) : null;
        if (!user) return reply.code(401).send({error: "Not logged in"});

        return user;
    });
}