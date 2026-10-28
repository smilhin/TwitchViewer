import {db} from "./index.js";

export function findUserById(id: string): { id: string; name: string } | undefined {
    return db.prepare("SELECT id, name FROM users WHERE id = ?").get(id) as
        | { id: string; name: string }
        | undefined;
}

export function findUserByName(name: string) {
    return db.prepare("SELECT id, name, password_hash FROM users WHERE name = ?").get(name) as
        | { id: string; name: string; password_hash: string }
        | undefined;
}

export function getUserChannels(userId: string): string[] {
    return db.prepare("SELECT channel FROM user_streamers WHERE user_id = ?")
        .all(userId).map((r: any) => r.channel);
}

export function insertUser(id: string, name: string, passwordHash: string): void {
    db.prepare("INSERT INTO users (id, name, password_hash) VALUES (?, ?, ?)").run(id, name, passwordHash);
}

export function insertStreamer(userId: string, channelName: string): boolean {
    const result = db.prepare("INSERT OR IGNORE INTO user_streamers (user_id, channel) VALUES (?, ?)").run(userId, channelName);
    return result.changes > 0;
}

export function removeStreamer(userId: string, channelName: string): boolean {
    const result = db.prepare("DELETE FROM user_streamers WHERE user_id = ? AND channel = ?").run(userId, channelName);
    return result.changes > 0;
}