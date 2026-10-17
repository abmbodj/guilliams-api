import { DatabaseSync, type SQLInputValue } from "node:sqlite";
import { dirname } from "node:path";
import { mkdirSync, readFileSync } from "node:fs";
import {
  randomBytes,
  scryptSync,
  createHash,
  timingSafeEqual,
} from "node:crypto";
import { ApiError } from "./errors.js";
import { CITIES, CATEGORY_FIELDS } from "./catalog.js";

export const uid = () => randomBytes(12).toString("hex");
export const tokenHash = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export function passwordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return (
    salt +
    ":" +
    scryptSync(password, salt, 64, {
      N: 16384,
      r: 8,
      p: 1,
      maxmem: 64 * 1024 * 1024,
    }).toString("hex")
  );
}
export function passwordMatches(password: string, stored: string | null) {
  if (!stored) return false;
  const [salt, digest] = stored.split(":");
  if (!salt || !digest || !/^[0-9a-f]{128}$/.test(digest)) return false;
  const actual = scryptSync(password, salt, 64, {
    N: 16384,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
  return timingSafeEqual(actual, Buffer.from(digest, "hex"));
}
// SQL rows are the one dynamic boundary; HTTP inputs/outputs use generated schema types and AJV.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;
const identifier = (s: string) => {
  if (!/^[a-z_]+$/.test(s)) throw new Error("Invalid SQL identifier");
  return s;
};
function bindings(args: unknown[]): SQLInputValue[] {
  return args.map((v) => {
    if (typeof v === "boolean") return Number(v);
    if (v === undefined) return null;
    if (
      v === null ||
      typeof v === "number" ||
      typeof v === "string" ||
      typeof v === "bigint" ||
      v instanceof Uint8Array
    )
      return v;
    throw new TypeError("Unsupported SQLite parameter");
  });
}
export class Store {
  readonly connection: DatabaseSync;
  constructor(
    public readonly path: string,
    timestamp: number,
  ) {
    if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
    this.connection = new DatabaseSync(path);
    this.connection.exec("PRAGMA foreign_keys=ON; PRAGMA busy_timeout=10000;");
    this.connection.exec(
      readFileSync(new URL("./schema.sql", import.meta.url), "utf8"),
    );
    this.transaction(() => {
      for (const [id, name] of Object.entries(CITIES))
        this.run("INSERT OR IGNORE INTO cities VALUES (?,?)", [id, name]);
      for (const [id, value] of Object.entries(CATEGORY_FIELDS))
        this.run("INSERT OR IGNORE INTO categories VALUES (?,?)", [
          id,
          value.name,
        ]);
      if (!this.one("SELECT 1 FROM users LIMIT 1")) this.seed(timestamp);
    });
  }
  one<T extends object = Row>(
    sql: string,
    args: unknown[] = [],
  ): T | undefined {
    return this.connection.prepare(sql).get(...bindings(args)) as T | undefined;
  }
  all<T extends object = Row>(sql: string, args: unknown[] = []): T[] {
    return this.connection.prepare(sql).all(...bindings(args)) as T[];
  }
  run(sql: string, args: unknown[] = []) {
    return this.connection.prepare(sql).run(...bindings(args));
  }
  insert(table: string, value: object) {
    const keys = Object.keys(value);
    const values = Object.values(value);
    return this.run(
      `INSERT INTO ${identifier(table)} (${keys.map(identifier).join(",")}) VALUES (${keys.map(() => "?").join(",")})`,
      values,
    );
  }
  update(table: string, value: object, where: string, args: unknown[] = []) {
    const entries = Object.entries(value);
    if (!entries.length) return;
    return this.run(
      `UPDATE ${identifier(table)} SET ${entries.map(([k]) => identifier(k) + "=?").join(",")} WHERE ${where}`,
      [...entries.map(([, v]) => v), ...args],
    );
  }
  transaction<T>(fn: () => T): T {
    this.connection.exec("BEGIN IMMEDIATE");
    try {
      const result = fn();
      if (result instanceof Promise)
        throw new Error("SQLite transactions must be synchronous");
      this.connection.exec("COMMIT");
      return result;
    } catch (error) {
      this.connection.exec(
        error instanceof ApiError && error.persist ? "COMMIT" : "ROLLBACK",
      );
      throw error;
    }
  }
  close() {
    this.connection.close();
  }
  private seed(timestamp: number) {
    const users = [
      "alice",
      "bob",
      "carol",
      "sponsor-a",
      "sponsor-b",
      "sponsor-c",
    ];
    for (const [i, name] of users.entries()) {
      this.insert("users", {
        id: name,
        username: name,
        password_hash: passwordHash("DemoPass123!"),
        phone: `+44770090000${i}`,
        email: `${name}@example.test`,
        first_name: name[0].toUpperCase() + name.slice(1),
        last_name: "Example",
        city_id: "london",
        house_rules_accepted: 1,
        created_at: timestamp,
      });
      this.run("INSERT INTO user_categories VALUES (?,?,?)", [
        name,
        "yard-sale",
        0,
      ]);
    }
    for (const sponsor of ["sponsor-a", "sponsor-b", "sponsor-c"])
      this.run("INSERT INTO sponsorships VALUES (?,?,?,?,?,?)", [
        uid(),
        "alice",
        sponsor,
        "friend",
        "accepted",
        timestamp,
      ]);
    for (const [id, { name }] of Object.entries(CATEGORY_FIELDS)) {
      let attributes: object = {};
      if (id === "cars-boats")
        attributes = { vehicle_type: "cars", year: 2020, mileage_km: 12000 };
      if (id === "tickets")
        attributes = {
          ticket_count: 2,
          ticket_type: "sport",
          dates: ["2027-01-01"],
        };
      this.insert("listings", {
        id: id === "yard-sale" ? "demo-chair" : `demo-${id}`,
        seller_id: "alice",
        title: id === "yard-sale" ? "Demo chair" : `Demo ${name}`,
        description: "Fictional Phase 1 example. No real transaction.",
        category_id: id,
        city_id: "london",
        postal_code: "SW1A 1AA",
        town: "London",
        price_minor: 8000,
        currency: "GBP",
        price_unit: "item",
        attributes: JSON.stringify(attributes),
        status: "active",
        created_at: timestamp,
        updated_at: timestamp,
      });
    }
    this.run("INSERT INTO yard_sales VALUES (?,?,?,?)", [
      "demo-yard-sale",
      timestamp + 172800,
      timestamp + 259200,
      timestamp + 86400,
    ]);
  }
}
