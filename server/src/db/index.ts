import Database from "better-sqlite3";
import {config} from "../config.js";

export const db: Database.Database = new Database(config.dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS users
    (
        id
        TEXT
        PRIMARY
        KEY,
        name
        TEXT
        UNIQUE
        NOT
        NULL,
        password_hash
        TEXT
        NOT
        NULL
    );
    CREATE TABLE IF NOT EXISTS sessions
    (
        id
        TEXT
        PRIMARY
        KEY, -- SHA-256 of the token, never the token itself
        user_id
        TEXT
        NOT
        NULL
        REFERENCES
        users
    (
        id
    ),
        expires_at INTEGER NOT NULL -- unix ms
        );
    CREATE TABLE IF NOT EXISTS user_streamers
    (
        user_id
        TEXT
        NOT
        NULL
        REFERENCES
        users
    (
        id
    ),
        channel TEXT NOT NULL,
        PRIMARY KEY
    (
        user_id,
        channel
    )
        );
`);