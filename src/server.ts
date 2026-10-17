import { createApp } from "./app.js";
const app = createApp({
  dbPath: process.env.GUILLIAMS_DB ?? "data/guilliams.sqlite3",
  demoMode:
    (process.env.GUILLIAMS_DEMO_MODE ?? "true").toLowerCase() === "true",
  logger: true,
});
for (const signal of ["SIGINT", "SIGTERM"] as const)
  process.once(signal, () => {
    void app.close().then(() => process.exit(0));
  });
await app.listen({
  host: process.env.HOST ?? "127.0.0.1",
  port: Number(process.env.PORT ?? 8765),
});
