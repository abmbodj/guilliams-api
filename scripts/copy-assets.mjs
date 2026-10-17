import { copyFile, mkdir } from "node:fs/promises";
const root = new URL("../", import.meta.url);
await mkdir(new URL("dist/", root), { recursive: true });
for (const file of ["schema.sql", "openapi-source.json"]) {
  await copyFile(new URL(`src/${file}`, root), new URL(`dist/${file}`, root));
}
console.log("Copied runtime SQLite schema and OpenAPI contract to dist.");
