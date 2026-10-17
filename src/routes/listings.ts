import { validateInput } from "../validation.js";
import {
  type Store,
  type Register,
  fail,
  uid,
  listing,
  requireFull,
  validateListing,
  page,
} from "../core.js";
import type { Schema } from "../types.js";
import { CATEGORY_FIELDS } from "../catalog.js";
const createFields = [
  "title",
  "description",
  "category_id",
  "city_id",
  "postal_code",
  "town",
  "price_minor",
  "currency",
  "price_unit",
  "photo_ids",
  "attributes",
] as const;
function payload(item: Schema<"Listing">): Schema<"ListingCreate"> {
  return Object.fromEntries(
    createFields.map((k) => [k, item[k]]),
  ) as Schema<"ListingCreate">;
}
export function searchItems(
  db: Store,
  userId: string,
  options: {
    q?: string;
    category_id?: string;
    city_id?: string;
    min_price?: number;
    max_price?: number;
    filters?: string;
  } = {},
): Schema<"Listing">[] {
  const { q, category_id, city_id, min_price, max_price, filters } = options;
  let sql =
    "SELECT l.id FROM listings l JOIN users u ON u.id=l.seller_id WHERE l.status='active' AND u.deleted_at IS NULL";
  const args: (string | number)[] = [];
  for (const [clause, value] of [
    ["l.category_id=?", category_id],
    ["l.city_id=?", city_id],
    ["l.price_minor>=?", min_price],
    ["l.price_minor<=?", max_price],
  ] as const)
    if (value !== undefined) {
      sql += " AND " + clause;
      args.push(value);
    }
  if (q) {
    sql += " AND (l.title LIKE ? OR l.description LIKE ?)";
    args.push("%" + q + "%", "%" + q + "%");
  }
  if (
    min_price !== undefined &&
    max_price !== undefined &&
    min_price > max_price
  )
    fail(422, "invalid_price_range", "Minimum price exceeds maximum price");
  let filter: Record<string, unknown> = {};
  if (filters) {
    try {
      const value: unknown = JSON.parse(filters);
      validateInput("Attributes", value);
      filter = value as Record<string, unknown>;
      if (filter.vehicle_type === "boats" && filter.mileage_km != null)
        throw Error();
    } catch {
      fail(
        422,
        "invalid_filters",
        "Filters must be a JSON object using typed category attribute fields",
      );
    }
    if (Object.values(filter).some((v) => v === null))
      fail(
        422,
        "invalid_filters",
        "Omit unused filters instead of setting null",
      );
    if (
      category_id &&
      (!Object.hasOwn(CATEGORY_FIELDS, category_id) ||
        Object.keys(filter).some(
          (k) => !CATEGORY_FIELDS[category_id]!.fields.includes(k),
        ))
    )
      fail(422, "invalid_filters", "Filter does not apply to this category");
  }
  return db
    .all<{ id: string }>(sql + " ORDER BY l.created_at DESC,l.id", args)
    .map((r) => listing(db, r.id, userId))
    .filter((item) =>
      Object.entries(filter).every(([key, wanted]) => {
        const actual = (item.attributes as Record<string, unknown>)[key];
        if (Array.isArray(wanted)) {
          if (!wanted.length) return true;
          const values = Array.isArray(actual) ? actual : [];
          return key === "dates"
            ? wanted.some((v) => values.includes(v))
            : wanted.every((v) => values.includes(v));
        }
        if (actual == null) return false;
        if (["bedrooms", "bathrooms", "surface_m2", "guests"].includes(key))
          return (actual as number) >= (wanted as number);
        return actual === wanted;
      }),
    );
}
export function registerListings(register: Register): void {
  register("GET", "/api/listings/", (ctx) => {
    const u = ctx.user();
    const q = ctx.query as Parameters<typeof searchItems>[2] & {
      offset?: number;
      limit?: number;
    };
    if (q?.q)
      ctx.db.insert("search_history", {
        user_id: u.id,
        query: q.q,
        created_at: ctx.now,
      });
    return page(searchItems(ctx.db, u.id, q), q?.offset, q?.limit);
  });
  register<Schema<"ListingCreate">>("POST", "/api/listings/", (ctx, body) => {
    const u = ctx.user();
    requireFull(ctx.db, u.id);
    const value = validateListing(ctx.db, body, u.id);
    const { photo_ids = [], attributes, ...rest } = value;
    const id = uid();
    ctx.db.insert("listings", {
      ...rest,
      attributes: JSON.stringify(attributes),
      id,
      seller_id: u.id,
      status: "draft",
      created_at: ctx.now,
      updated_at: ctx.now,
    });
    photo_ids.forEach((p: string, i: number) =>
      ctx.db.insert("listing_photos", {
        listing_id: id,
        media_id: p,
        position: i,
      }),
    );
    ctx.reply.code(201);
    return listing(ctx.db, id, u.id);
  });
  register("GET", "/api/listings/:listing_id/", (ctx) =>
    listing(ctx.db, ctx.params.listing_id!, ctx.user().id),
  );
  register<Schema<"ListingPatch">>(
    "PATCH",
    "/api/listings/:listing_id/",
    (ctx, body) => {
      const u = ctx.user(),
        id = ctx.params.listing_id!;
      const item = listing(ctx.db, id, u.id, true);
      if (["sold", "deleted"].includes(item.status))
        fail(409, "listing_closed", "This listing cannot be edited");
      if (Object.values(body).some((v) => v === null))
        fail(422, "validation_error", "Listing fields may not be null");
      if (
        (["currency", "price_unit"] as const).some(
          (k) => k in body && body[k] !== item[k],
        ) &&
        ctx.db.one(
          "SELECT id FROM offers WHERE listing_id=? AND status IN ('pending','accepted')",
          [id],
        )
      )
        fail(
          409,
          "live_offer",
          "Currency and price unit cannot change during a live negotiation",
        );
      const value = validateListing(
        ctx.db,
        { ...payload(item), ...body } as Schema<"ListingCreate">,
        u.id,
      );
      const { photo_ids = [], attributes, ...rest } = value;
      ctx.db.update(
        "listings",
        {
          ...rest,
          attributes: JSON.stringify(attributes),
          updated_at: ctx.now,
        },
        "id=?",
        [id],
      );
      ctx.db.run("DELETE FROM listing_photos WHERE listing_id=?", [id]);
      photo_ids.forEach((p: string, i: number) =>
        ctx.db.insert("listing_photos", {
          listing_id: id,
          media_id: p,
          position: i,
        }),
      );
      return listing(ctx.db, id, u.id);
    },
  );
  register("POST", "/api/listings/:listing_id/publish/", (ctx) => {
    const u = ctx.user(),
      id = ctx.params.listing_id!;
    requireFull(ctx.db, u.id);
    const item = listing(ctx.db, id, u.id, true);
    if (item.status !== "draft")
      fail(409, "invalid_transition", "Only a draft can be published");
    validateListing(ctx.db, payload(item), u.id);
    ctx.db.update(
      "listings",
      { status: "active", updated_at: ctx.now },
      "id=?",
      [id],
    );
    return listing(ctx.db, id, u.id);
  });
  register<Schema<"ListingStatus">>(
    "POST",
    "/api/listings/:listing_id/status/",
    (ctx, body) => {
      const u = ctx.user(),
        id = ctx.params.listing_id!;
      const item = listing(ctx.db, id, u.id, true);
      if (!(
        ["active", "paused"].includes(item.status) &&
        ["active", "paused", "sold"].includes(body.status) &&
        body.status !== item.status
      ))
        fail(
          409,
          "invalid_transition",
          "This listing state cannot change that way",
        );
      if (body.status === "active") requireFull(ctx.db, u.id);
      if (body.buyer_id && body.status !== "sold")
        fail(422, "invalid_buyer", "A buyer is only valid when marking sold");
      let buyer = body.buyer_id ?? null;
      const accepted = ctx.db.one<{ sender_id: string; recipient_id: string }>(
        "SELECT * FROM offers WHERE listing_id=? AND status='accepted'",
        [id],
      );
      if (body.status === "sold" && accepted) {
        const expected =
          accepted.sender_id !== u.id
            ? accepted.sender_id
            : accepted.recipient_id;
        if (buyer && buyer !== expected)
          fail(
            409,
            "buyer_conflict",
            "Choose the member whose offer was accepted",
          );
        buyer = expected;
      }
      if (
        buyer &&
        (buyer === u.id ||
          !ctx.db.one(
            "SELECT id FROM users WHERE id=? AND deleted_at IS NULL",
            [buyer],
          ))
      )
        fail(422, "invalid_buyer", "Choose another active member");
      ctx.db.update(
        "listings",
        { status: body.status, buyer_id: buyer, updated_at: ctx.now },
        "id=?",
        [id],
      );
      if (body.status === "sold")
        ctx.db.run(
          "UPDATE offers SET status='declined' WHERE listing_id=? AND status='pending'",
          [id],
        );
      return listing(ctx.db, id, u.id);
    },
  );
  register("DELETE", "/api/listings/:listing_id/", (ctx) => {
    const u = ctx.user(),
      id = ctx.params.listing_id!;
    listing(ctx.db, id, u.id, true);
    ctx.db.update(
      "listings",
      { status: "deleted", updated_at: ctx.now },
      "id=?",
      [id],
    );
    ctx.db.run(
      "UPDATE offers SET status='declined' WHERE listing_id=? AND status='pending'",
      [id],
    );
    ctx.reply.code(204);
  });
  register("GET", "/api/listings/:listing_id/similar/", (ctx) => {
    const u = ctx.user(),
      id = ctx.params.listing_id!,
      item = listing(ctx.db, id, u.id);
    return page(
      searchItems(ctx.db, u.id, {
        category_id: item.category_id,
        city_id: item.city_id,
      }).filter((x) => x.id !== id),
      ctx.query.offset,
      ctx.query.limit,
    );
  });
  register("GET", "/api/me/listings/", (ctx) => {
    const u = ctx.user();
    return page(
      ctx.db
        .all<{ id: string }>(
          "SELECT id FROM listings WHERE seller_id=? ORDER BY created_at DESC,id",
          [u.id],
        )
        .map((r) => listing(ctx.db, r.id, u.id))
        .filter((x) => !ctx.query.status || x.status === ctx.query.status),
      ctx.query.offset,
      ctx.query.limit,
    );
  });
  register("GET", "/api/me/purchases/", (ctx) => {
    const u = ctx.user();
    return page(
      ctx.db
        .all<{ id: string }>(
          "SELECT id FROM listings WHERE buyer_id=? AND status='sold' ORDER BY updated_at DESC,id",
          [u.id],
        )
        .map((r) => listing(ctx.db, r.id, u.id)),
      ctx.query.offset,
      ctx.query.limit,
    );
  });
  register("PUT", "/api/favourites/:listing_id/", (ctx) => {
    const u = ctx.user(),
      id = ctx.params.listing_id!,
      item = listing(ctx.db, id, u.id);
    if (item.status !== "active")
      fail(409, "listing_unavailable", "Only active listings can be added");
    ctx.db.run("INSERT OR IGNORE INTO favourites VALUES (?,?)", [u.id, id]);
    return { listing_id: id, unavailable: false, listing: item };
  });
  register("DELETE", "/api/favourites/:listing_id/", (ctx) => {
    ctx.db.run("DELETE FROM favourites WHERE user_id=? AND listing_id=?", [
      ctx.user().id,
      ctx.params.listing_id!,
    ]);
    ctx.reply.code(204);
  });
  register("GET", "/api/favourites/", (ctx) => {
    const u = ctx.user();
    return page(
      ctx.db
        .all<{ listing_id: string; status: string; deleted_at: number | null }>(
          "SELECT f.listing_id,l.status,u.deleted_at FROM favourites f JOIN listings l ON l.id=f.listing_id JOIN users u ON u.id=l.seller_id WHERE f.user_id=? ORDER BY f.listing_id",
          [u.id],
        )
        .map((x) => {
          const available =
            ["active", "sold"].includes(x.status) && x.deleted_at === null;
          return {
            listing_id: x.listing_id,
            unavailable: !available,
            listing: available ? listing(ctx.db, x.listing_id, u.id) : null,
          };
        }),
      ctx.query.offset,
      ctx.query.limit,
    );
  });
  register<Schema<"MediaCreate">>("POST", "/api/media/", (ctx, body) => {
    const u = ctx.user();
    if (
      !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
        body.content_base64,
      )
    )
      fail(422, "invalid_image", "Image must be valid base64");
    const data = Buffer.from(body.content_base64, "base64");
    if (data.length > 2 * 1024 * 1024)
      fail(413, "image_too_large", "Image must be at most 2 MiB");
    const signature =
      body.content_type === "image/png"
        ? Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
        : Buffer.from([255, 216, 255]);
    if (!data.subarray(0, signature.length).equals(signature))
      fail(422, "invalid_image", "Image signature does not match content type");
    const id = uid();
    ctx.db.insert("media", {
      id,
      owner_id: u.id,
      filename: body.filename,
      content_type: body.content_type,
      size: data.length,
      bytes: data,
    });
    ctx.reply.code(201);
    return {
      id,
      filename: body.filename,
      content_type: body.content_type,
      size: data.length,
      content_url: `/api/media/${id}/content/`,
    };
  });
  register("GET", "/api/media/:media_id/content/", (ctx) => {
    const u = ctx.user(),
      id = ctx.params.media_id!;
    const image = ctx.db.one<{
      owner_id: string;
      bytes: Uint8Array;
      content_type: string;
    }>("SELECT * FROM media WHERE id=?", [id]);
    if (!image) fail(404, "not_found", "Photo not found");
    const allowed =
      image.owner_id === u.id ||
      ctx.db.one(
        "SELECT id FROM users WHERE photo_id=? AND deleted_at IS NULL",
        [id],
      ) ||
      ctx.db.one(
        "SELECT l.id FROM listing_photos p JOIN listings l ON l.id=p.listing_id JOIN users u ON u.id=l.seller_id WHERE p.media_id=? AND l.status IN ('active','sold') AND u.deleted_at IS NULL",
        [id],
      ) ||
      ctx.db.one(
        "SELECT m.id FROM messages m JOIN conversation_members cm ON cm.conversation_id=m.conversation_id WHERE m.photo_id=? AND cm.user_id=?",
        [id, u.id],
      );
    if (!allowed) fail(404, "not_found", "Photo not found");
    ctx.reply
      .type(image.content_type)
      .header("X-Content-Type-Options", "nosniff")
      .header("Cache-Control", "private, no-store");
    return Buffer.from(image.bytes);
  });
}
