import type { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import type { Schema } from "./types.js";
import { Store, uid, tokenHash } from "./db.js";
import { fail } from "./errors.js";
import { CATEGORY_FIELDS } from "./catalog.js";
import { specification, validateInput } from "./validation.js";
export { Store, uid, fail };

export interface Context {
  db: Store;
  request: FastifyRequest;
  reply: FastifyReply;
  params: Record<string, string>;
  query: Record<string, any>;
  now: number;
  demoMode: boolean;
  user(): Schema<"User">;
}
export type Register = <B = undefined>(
  method: HTTPMethods,
  path: string,
  handler: (ctx: Context, body: B) => object | string | number | null | void,
) => void;
export function countSponsors(db: Store, id: string): number {
  return db.one(
    "SELECT count(*) AS n FROM sponsorships WHERE requester_id=? AND status='accepted'",
    [id],
  )!.n;
}
export function publicUser(db: Store, id: string): Schema<"User"> {
  const user = db.one("SELECT * FROM users WHERE id=? AND deleted_at IS NULL", [
    id,
  ]);
  if (!user) fail(404, "not_found", "User not found");
  const categoryIds = db
    .all(
      "SELECT category_id FROM user_categories WHERE user_id=? ORDER BY position",
      [id],
    )
    .map((r) => r.category_id as string);
  const count = countSponsors(db, id);
  const steps: [string, unknown][] = [
    ["location", user.city_id],
    ["email", user.email],
    ["name", user.first_name && user.last_name],
    ["categories", categoryIds.length],
    ["house_rules", user.house_rules_accepted],
  ];
  return {
    id: user.id,
    username: user.username,
    phone: user.phone,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    city_id: user.city_id,
    photo_id: user.photo_id,
    category_ids: categoryIds,
    message_consent: Boolean(user.message_consent),
    house_rules_accepted: Boolean(user.house_rules_accepted),
    notifications_enabled: Boolean(user.notifications_enabled),
    sponsorship_count: count,
    access_status: count >= 3 ? "full" : "pending_sponsors",
    onboarding_step: steps.find(([, v]) => !v)?.[0] ?? "complete",
    verification_status: user.verification_status,
  };
}
export function bearerToken(request: FastifyRequest) {
  const h = request.headers.authorization;
  const match = h?.match(/^Bearer\s+(\S+)$/i);
  return match?.[1];
}
export function currentUser(
  db: Store,
  request: FastifyRequest,
  timestamp: number,
): Schema<"User"> {
  const token = bearerToken(request);
  if (!token) fail(401, "unauthenticated", "Sign in to continue");
  const session = db.one("SELECT * FROM sessions WHERE token_hash=?", [
    tokenHash(token),
  ]);
  if (!session || session.expires_at <= timestamp)
    fail(401, "unauthenticated", "Session is missing or expired");
  if (
    !db.one("SELECT id FROM users WHERE id=? AND deleted_at IS NULL", [
      session.user_id,
    ])
  )
    fail(401, "unauthenticated", "Session is missing or expired");
  return publicUser(db, session.user_id);
}
export function sessionResponse(
  db: Store,
  id: string,
  timestamp: number,
): Schema<"Session"> {
  const token = uid() + uid();
  const expires = timestamp + 86400;
  db.run("INSERT INTO sessions VALUES (?,?,?)", [
    tokenHash(token),
    id,
    expires,
  ]);
  return {
    session_token: token,
    token_type: "bearer",
    expires_at: expires,
    user: publicUser(db, id),
  };
}
export function notify(
  db: Store,
  userId: string,
  kind: string,
  title: string,
  targetType: string,
  targetId: string,
  timestamp: number,
  body = "",
) {
  db.run("INSERT INTO notifications VALUES (?,?,?,?,?,?,?,?,?)", [
    uid(),
    userId,
    kind,
    title,
    body,
    targetType,
    targetId,
    null,
    timestamp,
  ]);
}
export function member(db: Store, id: string): Schema<"Member"> {
  const u = publicUser(db, id);
  return {
    id: u.id,
    display_name: u.first_name
      ? `${u.first_name} ${(u.last_name ?? "").slice(0, 1)}.`.trim()
      : u.username,
    photo_id: u.photo_id ?? null,
    city_id: u.city_id ?? null,
    sponsorship_count: u.sponsorship_count ?? 0,
    verification_status: u.verification_status ?? "unverified",
  };
}
function attributeDefaults(
  value: Schema<"Attributes"> = {},
): Schema<"Attributes"> {
  const fields = specification.components.schemas.Attributes.properties;
  return {
    ...Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [
        k,
        (v as { default?: unknown }).default ??
          ((v as { type?: string }).type === "array" ? [] : null),
      ]),
    ),
    ...value,
  };
}
export function listing(
  db: Store,
  id: string,
  userId: string,
  ownerOnly = false,
): Schema<"Listing"> {
  const item = db.one("SELECT * FROM listings WHERE id=?", [id]);
  if (!item) fail(404, "not_found", "Listing not found");
  if (ownerOnly && item.seller_id !== userId)
    fail(403, "forbidden", "Only the seller can change this listing");
  const seller = db.one("SELECT deleted_at FROM users WHERE id=?", [
    item.seller_id,
  ]);
  if (
    (["draft", "paused", "deleted"].includes(item.status) ||
      seller?.deleted_at !== null) &&
    item.seller_id !== userId
  )
    fail(404, "not_found", "Listing is unavailable");
  const { buyer_id: _, ...publicFields } = item;
  return {
    ...publicFields,
    attributes: attributeDefaults(JSON.parse(item.attributes)),
    photo_ids: db
      .all(
        "SELECT media_id FROM listing_photos WHERE listing_id=? ORDER BY position",
        [id],
      )
      .map((r) => r.media_id),
    unavailable: item.status === "deleted",
  } as Schema<"Listing">;
}
export function requireFull(db: Store, id: string) {
  if (countSponsors(db, id) < 3)
    fail(
      403,
      "sponsors_required",
      "Three accepted sponsors are required to sell",
    );
}
export function validateListing(
  db: Store,
  payload: Schema<"ListingCreate">,
  owner: string,
): Schema<"ListingCreate"> {
  const data = validateInput("ListingCreate", structuredClone(payload), true);
  const category = Object.hasOwn(CATEGORY_FIELDS, data.category_id)
    ? CATEGORY_FIELDS[data.category_id]
    : undefined;
  if (!category) fail(422, "invalid_category", "Choose a listed category");
  if (!db.one("SELECT id FROM cities WHERE id=?", [data.city_id]))
    fail(422, "invalid_city", "Choose a listed city");
  const attrs = attributeDefaults(data.attributes ?? {});
  if (
    attrs.vehicle_type === "boats" &&
    attrs.mileage_km !== null &&
    attrs.mileage_km !== undefined
  )
    fail(422, "invalid_attributes", "Mileage is disabled for boats");
  for (const [key, value] of Object.entries(attrs))
    if (
      value !== null &&
      !(Array.isArray(value) && !value.length) &&
      !category.fields.includes(key)
    )
      fail(
        422,
        "invalid_attributes",
        "Some item details do not apply to this category",
      );
  if (attrs.price_max_minor != null && attrs.price_max_minor < data.price_minor)
    fail(
      422,
      "invalid_price_range",
      "Maximum price must be at least the minimum price",
    );
  const photos = data.photo_ids ?? [];
  if (new Set(photos).size !== photos.length)
    fail(422, "duplicate_photos", "Each photo may appear only once");
  for (const photo of photos)
    if (
      !db.one("SELECT id FROM media WHERE id=? AND owner_id=?", [photo, owner])
    )
      fail(422, "invalid_photo", "Upload each photo before attaching it");
  return { ...data, photo_ids: photos, attributes: attrs };
}
export function page<T>(items: T[], offset = 0, limit = 20) {
  return {
    items: items.slice(offset, offset + limit),
    total: items.length,
    offset,
    limit,
  };
}
export function conversationAccess(
  db: Store,
  id: string,
  userId: string,
): Schema<"Conversation"> {
  const conv = db.one<Schema<"Conversation">>(
    "SELECT * FROM conversations WHERE id=?",
    [id],
  );
  if (!conv) fail(404, "not_found", "Conversation not found");
  if (
    !db.one(
      "SELECT 1 FROM conversation_members WHERE conversation_id=? AND user_id=?",
      [id, userId],
    )
  )
    fail(403, "forbidden", "This conversation is private");
  return conv;
}
export function openConversation(
  db: Store,
  userId: string,
  kind: string,
  listingId: string | null,
  topic: string,
  timestamp: number,
): Schema<"Conversation"> {
  let existing: Schema<"Conversation"> | undefined;
  let members: string[];
  if (kind === "listing") {
    const item = listing(db, listingId!, userId);
    if (item.seller_id === userId)
      fail(422, "own_listing", "Choose another member's listing");
    if (item.status !== "active")
      fail(409, "listing_unavailable", "This listing is no longer active");
    existing = db.one(
      "SELECT co.* FROM conversations co JOIN conversation_members cm ON cm.conversation_id=co.id WHERE cm.user_id=? AND co.kind='listing' AND co.listing_id=? AND co.closed_at IS NULL",
      [userId, listingId],
    );
    members = [userId, item.seller_id];
  } else {
    existing = db.one(
      "SELECT co.* FROM conversations co JOIN conversation_members cm ON cm.conversation_id=co.id WHERE cm.user_id=? AND co.kind='concierge' AND co.topic=? AND co.closed_at IS NULL AND co.created_at>?",
      [userId, topic, timestamp - 86400],
    );
    members = [userId];
  }
  if (existing) return existing;
  const conv = {
    id: uid(),
    kind,
    listing_id: listingId,
    topic,
    created_at: timestamp,
    closed_at: null,
  };
  db.insert("conversations", conv);
  for (const id of members)
    db.run("INSERT INTO conversation_members VALUES (?,?)", [conv.id, id]);
  return conv;
}
