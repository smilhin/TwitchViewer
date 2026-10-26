import crypto from "node:crypto";
import type {User} from "@twitchviewer/shared";
import {findUserById, findUserByName, getUserChannels, insertUser} from "../db/users.js";
import {createSession, deleteSession, findSession} from "../db/sessions.js";
import {hashPassword, verifyPassword} from "../lib/password.js";

const SESSION_MS = 14 * 24 * 60 * 60 * 1000;
export const hashToken = (t: string) => crypto.createHash("sha256").update(t).digest("hex");

function startSession(id: string, name: string): { token: string; user: User } {
    const token = crypto.randomBytes(32).toString("base64url");
    createSession(hashToken(token), id, Date.now() + SESSION_MS);

    return {token, user: {id, name, streamers: getUserChannels(id)}};
}

export async function login(name: string, password: string): Promise<{ token: string; user: User } | null> {
    const row = findUserByName(name);
    if (!row || !(await verifyPassword(row.password_hash, password))) return null;

    return startSession(row.id, row.name);
}

export async function signup(name: string, password: string): Promise<{ token: string; user: User } | null> {
    if (findUserByName(name)) return null;

    const id = crypto.randomUUID();
    try {
        insertUser(id, name, await hashPassword(password));
    } catch (err: any) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE") return null;
        throw err;
    }

    return startSession(id, name);
}

export function logout(token: string): void {
    deleteSession(hashToken(token));
}

export function getUserFromToken(token: string): User | null {
    const session = findSession(hashToken(token));
    if (!session) return null;

    if (session.expires_at < Date.now()) {
        deleteSession(session.id);
        return null;
    }

    const row = findUserById(session.user_id);
    if (!row) return null;

    return {id: row.id, name: row.name, streamers: getUserChannels(row.id)};
}