import type { components } from "./generated/api-types.js";
export type SchemaName = keyof components["schemas"];
export type Schema<N extends SchemaName> = components["schemas"][N];
