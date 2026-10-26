import type {FastifyRequest} from "fastify";
import type {User} from "@twitchviewer/shared";
import {getUserFromToken} from "../services/auth.js";

export function getCurrentUser(req: FastifyRequest): User | null {
    const token = req.cookies.session;
    return token ? getUserFromToken(token) : null;
}