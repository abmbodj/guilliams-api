import { readFile, writeFile } from "node:fs/promises";
import SwaggerParser from "@apidevtools/swagger-parser";
import { stringify } from "yaml";

const root = new URL("../", import.meta.url);
const source = JSON.parse(
  await readFile(new URL("src/openapi-source.json", root), "utf8"),
);
// Validation dereferences its input; keep the canonical contract untouched.
await SwaggerParser.validate(structuredClone(source));
await writeFile(
  new URL("openapi.json", root),
  JSON.stringify(source, null, 2) + "\n",
);
await writeFile(
  new URL("openapi.yaml", root),
  stringify(source, { lineWidth: 0 }),
);
const methods = new Set([
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "trace",
]);
const operations = Object.values(source.paths as Record<string, object>).reduce(
  (count, path) =>
    count + Object.keys(path).filter((method) => methods.has(method)).length,
  0,
);
console.log(
  `Validated and exported ${operations} operations across ${Object.keys(source.paths).length} paths.`,
);
