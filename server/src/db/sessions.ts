import {db} from "./index.js";

export function createSession(id: string, userId: string, expiresAt: number) {
    db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)").run(id, userId, expiresAt);
}

export function findSession(id: string): { id: string; user_id: string; expires_at: number } | undefined {
    return db.prepare("SELECT id, user_id, expires_at FROM sessions WHERE id = ?").get(id) as
        | { id: string; user_id: string; expires_at: number }
        | undefined;
}

export function deleteSession(id: string): void {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(id);
}