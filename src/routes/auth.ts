import type { Schema } from "../types.js";
import type { Register, Context } from "../core.js";
import { fail, uid, publicUser, sessionResponse } from "../core.js";
import { ApiError } from "../errors.js";
import { passwordHash, passwordMatches, tokenHash } from "../db.js";

type ChallengeRow = Schema<"ChallengeRequest"> & {
  id: string;
  user_id: string | null;
  expires_at: number;
  resend_after: number;
  used: number;
  attempts: number;
};
const result = (ch: ChallengeRow): Schema<"Challenge"> => ({
  id: ch.id,
  expires_at: ch.expires_at,
  resend_after: ch.resend_after,
  delivery: "simulated",
  demo_code: "123456",
});
function simulated(ctx: Context) {
  if (!ctx.demoMode)
    fail(503, "simulation_disabled", "Verification delivery is unavailable");
}
function validateDestination(body: Schema<"ChallengeRequest">) {
  if (
    body.channel === "phone" &&
    !/^\+[1-9][0-9]{7,14}$/.test(body.destination)
  )
    fail(422, "validation_error", "Phone must be E.164");
  if (body.channel === "email") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.destination))
      fail(422, "validation_error", "Enter a valid email address");
    body.destination = body.destination.toLowerCase();
  }
  if (
    ["signup", "change_phone"].includes(body.purpose) &&
    body.channel !== "phone"
  )
    fail(422, "validation_error", "Signup and phone change use a phone number");
}
export function registerAuth(register: Register) {
  register<Schema<"Signup">>("POST", "/api/signup/", (ctx, body) => {
    const id = uid();
    ctx.db.insert("users", {
      id,
      username: body.username.toLowerCase(),
      password_hash: passwordHash(body.password),
      phone: body.phone ?? null,
      created_at: ctx.now,
    });
    ctx.reply.code(201);
    return sessionResponse(ctx.db, id, ctx.now);
  });
  register<Schema<"Login">>("POST", "/api/login/", (ctx, body) => {
    const u = ctx.db.one(
      "SELECT * FROM users WHERE username=? AND deleted_at IS NULL",
      [body.username],
    );
    if (!u || !passwordMatches(body.password, u.password_hash))
      fail(401, "invalid_credentials", "Username or password is incorrect");
    return sessionResponse(ctx.db, u.id, ctx.now);
  });
  register("POST", "/api/logout/", (ctx) => {
    ctx.user();
    const token = ctx.request.headers.authorization!.split(/\s+/)[1];
    ctx.db.run("DELETE FROM sessions WHERE token_hash=?", [tokenHash(token)]);
    ctx.reply.code(204);
    return null;
  });
  register<Schema<"ChallengeRequest">>(
    "POST",
    "/api/auth/challenges/",
    (ctx, body) => {
      simulated(ctx);
      validateDestination(body);
      let owner: string | null = null;
      if (body.purpose === "change_phone") {
        owner = ctx.user().id;
        if (
          ctx.db.one("SELECT id FROM users WHERE phone=?", [body.destination])
        )
          fail(409, "contact_in_use", "Phone number is already used");
      }
      if (
        ctx.db.one(
          "SELECT id FROM challenges WHERE destination=? AND resend_after>?",
          [body.destination, ctx.now],
        )
      )
        fail(429, "resend_cooldown", "Wait before requesting another code");
      const ch = {
        ...body,
        id: uid(),
        user_id: owner,
        expires_at: ctx.now + 600,
        resend_after: ctx.now + 60,
      };
      ctx.db.insert("challenges", ch);
      ctx.reply.code(201);
      return result({ ...ch, used: 0, attempts: 0 });
    },
  );
  register("POST", "/api/auth/challenges/:challenge_id/resend/", (ctx) => {
    simulated(ctx);
    const ch = ctx.db.one<ChallengeRow>("SELECT * FROM challenges WHERE id=?", [
      ctx.params.challenge_id,
    ]);
    if (!ch) fail(404, "not_found", "Code request not found");
    if (ch.user_id && ctx.user().id !== ch.user_id)
      fail(403, "forbidden", "This request belongs to another account");
    if (ch.used) fail(409, "code_used", "Request a new code");
    if (ch.resend_after > ctx.now)
      fail(429, "resend_cooldown", "Wait before resending");
    ch.expires_at = ctx.now + 600;
    ch.resend_after = ctx.now + 60;
    ctx.db.update(
      "challenges",
      { expires_at: ch.expires_at, resend_after: ch.resend_after, attempts: 0 },
      "id=?",
      [ch.id],
    );
    return result(ch);
  });
  register<Schema<"Verify">>("POST", "/api/auth/verify/", (ctx, body) => {
    simulated(ctx);
    const ch = ctx.db.one<ChallengeRow>("SELECT * FROM challenges WHERE id=?", [
      body.challenge_id,
    ]);
    if (!ch) fail(404, "not_found", "Code request not found");
    if (ch.used) fail(409, "code_used", "Code has already been used");
    if (ch.expires_at <= ctx.now)
      fail(410, "code_expired", "Request a new code");
    if (ch.attempts >= 5)
      fail(
        429,
        "attempts_exceeded",
        "Request a new code after the resend cooldown",
      );
    if (ch.user_id && ctx.user().id !== ch.user_id)
      fail(403, "forbidden", "This request belongs to another account");
    if (body.code !== "123456") {
      ctx.db.run("UPDATE challenges SET attempts=attempts+1 WHERE id=?", [
        ch.id,
      ]);
      throw new ApiError(
        422,
        "invalid_code",
        "Invalid code. Please try again",
        [],
        true,
      );
    }
    let userId: string;
    if (ch.purpose === "change_phone") {
      userId = ch.user_id!;
      ctx.db.update("users", { phone: ch.destination }, "id=?", [userId]);
    } else {
      const field = ch.channel === "phone" ? "phone" : "email";
      const u = ctx.db.one(`SELECT id,deleted_at FROM users WHERE ${field}=?`, [
        ch.destination,
      ]);
      if (ch.purpose === "login") {
        if (!u || u.deleted_at !== null)
          fail(
            401,
            "invalid_credentials",
            "No active account matches this code request",
          );
        userId = u.id;
      } else {
        if (u)
          fail(
            409,
            "contact_in_use",
            "This contact already has an account; sign in",
          );
        userId = uid();
        ctx.db.insert("users", {
          id: userId,
          username: "member-" + userId.slice(0, 12),
          phone: ch.destination,
          created_at: ctx.now,
        });
      }
    }
    ctx.db.update("challenges", { used: 1 }, "id=?", [ch.id]);
    return sessionResponse(ctx.db, userId, ctx.now);
  });
  register("GET", "/api/me/", (ctx) => ctx.user());
  register<Schema<"ProfilePatch">>("PATCH", "/api/me/", (ctx, body) => {
    const user = ctx.user();
    const data = { ...body };
    for (const [key, value] of Object.entries(data))
      if (key !== "photo_id" && value === null)
        fail(422, "validation_error", "Only photo_id may be explicitly null");
    if (data.email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email!))
        fail(422, "validation_error", "Enter a valid email address");
      data.email = data.email!.toLowerCase();
    }
    if (
      data.city_id !== undefined &&
      !ctx.db.one("SELECT id FROM cities WHERE id=?", [data.city_id])
    )
      fail(422, "invalid_city", "Choose a listed city");
    if (
      data.photo_id &&
      !ctx.db.one("SELECT id FROM media WHERE id=? AND owner_id=?", [
        data.photo_id,
        user.id,
      ])
    )
      fail(422, "invalid_photo", "Upload a profile photo first");
    if (data.category_ids !== undefined) {
      const categories = data.category_ids!;
      if (new Set(categories).size !== categories.length)
        fail(422, "duplicate_categories", "Choose each category once");
      for (const id of categories)
        if (!ctx.db.one("SELECT id FROM categories WHERE id=?", [id]))
          fail(422, "invalid_category", "Choose listed categories");
      ctx.db.run("DELETE FROM user_categories WHERE user_id=?", [user.id]);
      for (const [position, id] of categories.entries())
        ctx.db.run("INSERT INTO user_categories VALUES (?,?,?)", [
          user.id,
          id,
          position,
        ]);
      delete data.category_ids;
    }
    ctx.db.update("users", data, "id=?", [user.id]);
    return publicUser(ctx.db, user.id);
  });
  register("POST", "/api/me/verification/", (ctx) => {
    ctx.db.update("users", { verification_status: "pending" }, "id=?", [
      ctx.user().id,
    ]);
    return { status: "pending" };
  });
  register<Schema<"DeleteAccount">>("DELETE", "/api/me/", (ctx, body) => {
    const id = ctx.user().id;
    ctx.db.update(
      "users",
      { deleted_at: ctx.now, deletion_reason: body.reason ?? "" },
      "id=?",
      [id],
    );
    ctx.db.run("DELETE FROM sessions WHERE user_id=?", [id]);
    ctx.db.update(
      "listings",
      { status: "deleted", updated_at: ctx.now },
      "seller_id=?",
      [id],
    );
    ctx.db.run(
      "UPDATE offers SET status='declined' WHERE status IN ('pending','accepted') AND (sender_id=? OR recipient_id=?)",
      [id, id],
    );
    ctx.db.run(
      "UPDATE conversations SET closed_at=? WHERE id IN (SELECT conversation_id FROM conversation_members WHERE user_id=?)",
      [ctx.now, id],
    );
    ctx.reply.code(204);
    return null;
  });
}
