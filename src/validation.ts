import {
  Ajv2020,
  type AnySchemaObject,
  type ValidateFunction,
} from "ajv/dist/2020.js";
import { createRequire } from "node:module";
const addFormats = createRequire(import.meta.url)("ajv-formats") as (
  ajv: Ajv2020,
) => void;
import { readFileSync } from "node:fs";
import { ApiError } from "./errors.js";
import type { Schema, SchemaName } from "./types.js";

export const specification = JSON.parse(
  readFileSync(new URL("./openapi-source.json", import.meta.url), "utf8"),
);
export function schemaRefs(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(schemaRefs);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [
        k,
        k === "$ref" && typeof v === "string"
          ? v.replace("#/components/schemas/", "#/$defs/")
          : schemaRefs(v),
      ]),
    );
  return value;
}
function compiler(defaults: boolean, coerce: boolean) {
  const ajv = new Ajv2020({
    strict: false,
    allErrors: true,
    useDefaults: defaults,
    coerceTypes: coerce,
  });
  addFormats(ajv);
  return ajv;
}
const bodyAjv = compiler(true, false),
  queryAjv = compiler(true, true),
  responseAjv = compiler(true, false),
  filterAjv = compiler(false, false);
const definitions = schemaRefs(specification.components.schemas);
export function compileSchema(
  schema: object,
  kind: "body" | "query" | "response" | "filter" = "body",
): ValidateFunction {
  const ajv = {
    body: bodyAjv,
    query: queryAjv,
    response: responseAjv,
    filter: filterAjv,
  }[kind];
  return ajv.compile({
    $defs: definitions,
    ...(schemaRefs(schema) as object),
  } as AnySchemaObject);
}
export function assertValid(
  validate: ValidateFunction,
  data: unknown,
  prefix = "body",
) {
  if (!validate(data))
    throw new ApiError(
      422,
      "validation_error",
      "Check the submitted fields",
      (validate.errors ?? []).map((e) => ({
        path: prefix + e.instancePath.replaceAll("/", "."),
        message: e.message ?? "Invalid value",
      })),
    );
}
const filters = new Map<SchemaName, ValidateFunction>();
export function validateInput<N extends SchemaName>(
  name: N,
  data: unknown,
  defaults = false,
): Schema<N> {
  let validate = defaults ? undefined : filters.get(name);
  if (!validate) {
    validate = compileSchema(
      { $ref: `#/components/schemas/${name}` },
      defaults ? "body" : "filter",
    );
    if (!defaults) filters.set(name, validate);
  }
  assertValid(validate, data);
  return data as Schema<N>;
}
export function trimStrings(value: unknown): unknown {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(trimStrings);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, trimStrings(v)]),
    );
  return value;
}
