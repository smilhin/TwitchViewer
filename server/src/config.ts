export const config = {
    host: process.env.HOST ?? "127.0.0.1",
    port: Number(process.env.PORT ?? 8080),
    dbPath: process.env.DB_PATH ?? "data/app.db",
    recordingsDir: process.env.RECORDINGS_DIR ?? "../../TwitchRecorder/recordings",
    secureCookies: process.env.SECURE_COOKIES === "true",
    devAuth: process.env.DEV_AUTH === "true",
};