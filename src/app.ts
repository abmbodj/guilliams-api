import Fastify, { type HTTPMethods, type FastifyInstance } from "fastify";
import { readFileSync } from "node:fs";
import { Store, currentUser, type Register, type Context } from "./core.js";
import { ApiError } from "./errors.js";
import {
  specification,
  compileSchema,
  assertValid,
  trimStrings,
} from "./validation.js";
import { registerAuth } from "./routes/auth.js";
import { registerListings } from "./routes/listings.js";
import { registerCommunity } from "./routes/community.js";

export interface AppOptions {
  dbPath?: string;
  demoMode?: boolean;
  clock?: () => number;
  logger?: boolean;
}
export type App = FastifyInstance & {
  store: Store;
  operations: ReadonlySet<string>;
};
const root = new URL("../", import.meta.url);
const validators = new Map<string, ReturnType<typeof compileSchema>>();
function validator(schema: object, kind: "body" | "query" | "response") {
  const key = kind + JSON.stringify(schema);
  let result = validators.get(key);
  if (!result) {
    result = compileSchema(schema, kind);
    validators.set(key, result);
  }
  return result;
}
export function createApp(options: AppOptions = {}): App {
  const clock = options.clock ?? (() => Date.now() / 1000),
    demoMode = options.demoMode ?? true;
  const app = Fastify({
    logger: options.logger ?? false,
    bodyLimit: 4 * 1024 * 1024,
    exposeHeadRoutes: false,
  }) as unknown as App;
  const db = new Store(options.dbPath ?? "data/guilliams.sqlite3", clock());
  const operations = new Set<string>();
  app.decorate("store", db);
  app.decorate("operations", operations);
  app.addHook("onClose", () => db.close());
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ApiError)
      return reply.code(error.status).send({
        error: {
          code: error.code,
          message: error.message,
          fields: error.fields,
        },
      });
    const code = (error as { code?: string }).code,
      message = (error as Error).message;
    if (code?.startsWith("ERR_SQLITE") && /constraint/i.test(message))
      return reply.code(409).send({
        error: {
          code: "conflict",
          message:
            "A unique value or relationship conflicts with existing data",
          fields: [],
        },
      });
    if (
      code === "FST_ERR_CTP_INVALID_JSON_BODY" ||
      code === "FST_ERR_CTP_EMPTY_JSON_BODY"
    )
      return reply.code(422).send({
        error: {
          code: "validation_error",
          message: "Submit valid JSON",
          fields: [],
        },
      });
    if (code === "FST_ERR_CTP_BODY_TOO_LARGE")
      return reply.code(413).send({
        error: {
          code: "image_too_large",
          message: "Request body is too large",
          fields: [],
        },
      });
    request.log.error(error);
    return reply.code(500).send({
      error: {
        code: "internal_error",
        message: "The request could not be completed",
        fields: [],
      },
    });
  });
  app.setNotFoundHandler((_request, reply) =>
    reply.code(404).send({
      error: { code: "not_found", message: "Route not found", fields: [] },
    }),
  );
  const register: Register = (method, path, handler) => {
    const canonical = path.replace(/:([A-Za-z_]+)/g, "{$1}");
    const operation = specification.paths[canonical]?.[method.toLowerCase()];
    if (!operation) throw new Error(`Unspecified route ${method} ${canonical}`);
    operations.add(`${method} ${canonical}`);
    const bodySchema =
      operation.requestBody?.content?.["application/json"]?.schema;
    const validateBody = bodySchema ? validator(bodySchema, "body") : null;
    const parameters = operation.parameters ?? [];
    const parameterSchema = (where: string) => ({
      type: "object",
      properties: Object.fromEntries(
        parameters
          .filter((p: { in: string }) => p.in === where)
          .map((p: { name: string; schema: object }) => [p.name, p.schema]),
      ),
      required: parameters
        .filter(
          (p: { in: string; required?: boolean }) =>
            p.in === where && p.required,
        )
        .map((p: { name: string }) => p.name),
    });
    const validateQuery = validator(parameterSchema("query"), "query"),
      validateParams = validator(parameterSchema("path"), "query");
    const status = Number(
      Object.keys(operation.responses).find((k) => /^2\d\d$/.test(k)) ?? 200,
    );
    const responses = new Map<number, ReturnType<typeof compileSchema>>();
    for (const [code, response] of Object.entries(operation.responses)) {
      const schema = (
        response as { content?: Record<string, { schema?: object }> }
      ).content?.["application/json"]?.schema;
      if (/^2\d\d$/.test(code) && schema)
        responses.set(Number(code), validator(schema, "response"));
    }
    const protectedRoute =
      operation.security?.length &&
      !operation.security.some((s: object) => Object.keys(s).length === 0);
    app.route({
      method: method as HTTPMethods,
      url: path.replace(/\{([^}]+)\}/g, ":$1"),
      handler(request, reply) {
        const body = trimStrings(request.body);
        request.body = body;
        if (
          validateBody &&
          (body !== undefined || operation.requestBody.required)
        )
          assertValid(validateBody, body);
        assertValid(validateQuery, request.query, "query");
        assertValid(validateParams, request.params, "path");
        reply.code(status);
        const data = db.transaction(() => {
          let cached: ReturnType<typeof currentUser> | undefined;
          const ctx: Context = {
            db,
            request,
            reply,
            params: request.params as Record<string, string>,
            query: request.query as Record<string, unknown>,
            now: clock(),
            demoMode,
            user: () => (cached ??= currentUser(db, request, ctx.now)),
          };
          if (protectedRoute) ctx.user();
          const result = handler(ctx, body as never);
          const validate = responses.get(reply.statusCode);
          if (validate && !validate(result)) {
            request.log.error(
              { errors: validate.errors },
              "Response violates API contract",
            );
            throw new Error("Invalid API response");
          }
          return result;
        });
        return reply.send(reply.statusCode === 204 ? undefined : data);
      },
    });
  };
  register("GET", "/api/health/", () => ({
    status: "ok",
    mode: demoMode ? "development-simulated" : "password-only",
  }));
  registerAuth(register);
  registerListings(register);
  registerCommunity(register);
  app.get("/openapi.json", () => specification);
  app.get("/docs", (_request, reply) =>
    reply
      .type("text/html")
      .send(
        `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Guilliams Mobile API — Swagger</title><link rel="stylesheet" href="/docs-assets/swagger-ui.css"><link rel="icon" href="/docs-assets/favicon-32x32.png"></head><body><div id="swagger-ui"></div><script src="/docs-assets/swagger-ui-bundle.js"></script><script>SwaggerUIBundle({url:'/openapi.json',dom_id:'#swagger-ui',persistAuthorization:false,validatorUrl:null})</script></body></html>`,
      ),
  );
  for (const [name, type] of [
    ["swagger-ui-bundle.js", "application/javascript"],
    ["swagger-ui.css", "text/css"],
    ["favicon-32x32.png", "image/png"],
  ])
    app.get(`/docs-assets/${name}`, (_request, reply) =>
      reply
        .type(type)
        .send(readFileSync(new URL(`static/swagger/${name}`, root))),
    );
  return app;
}
