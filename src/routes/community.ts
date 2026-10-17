import {
  type Register,
  type Store,
  fail,
  uid,
  listing,
  member,
  countSponsors,
  page,
  notify,
  conversationAccess,
  openConversation,
} from "../core.js";
import type { Schema } from "../types.js";
import { CITIES, CATEGORY_FIELDS } from "../catalog.js";
import { searchItems } from "./listings.js";

type Offer = Schema<"Offer">;
type Sponsorship = Schema<"Sponsorship">;
type Notification = Schema<"Notification"> & { user_id?: string };
type Sale = {
  id: string;
  starts_at: number;
  ends_at: number;
  registration_closes_at: number;
};

function yardSale(db: Store, userId: string, now: number) {
  const sale = db.one<Sale>(
    "SELECT * FROM yard_sales ORDER BY starts_at DESC LIMIT 1",
  )!;
  return {
    ...sale,
    registration_status: now < sale.registration_closes_at ? "open" : "closed",
    registered: !!db.one(
      "SELECT 1 FROM yard_sale_registrations WHERE yard_sale_id=? AND user_id=?",
      [sale.id, userId],
    ),
  };
}
function addMessage(
  db: Store,
  conv: string,
  sender: string | null,
  text: string,
  now: number,
  photo: string | null = null,
  offer: string | null = null,
) {
  const value = {
    id: uid(),
    conversation_id: conv,
    sender_id: sender,
    text,
    photo_id: photo,
    offer_id: offer,
    created_at: now,
  };
  db.insert("messages", value);
  for (const recipient of db.all<{ user_id: string }>(
    "SELECT user_id FROM conversation_members WHERE conversation_id=? AND user_id<>?",
    [conv, sender ?? ""],
  ))
    notify(
      db,
      recipient.user_id,
      "message",
      "New message",
      "conversation",
      conv,
      now,
    );
  return value;
}
function createOffer(
  db: Store,
  item: Schema<"Listing">,
  conv: string,
  sender: string,
  recipient: string,
  amount: number,
  now: number,
  parent: string | null = null,
) {
  const value = {
    id: uid(),
    listing_id: item.id,
    conversation_id: conv,
    sender_id: sender,
    recipient_id: recipient,
    amount_minor: amount,
    currency: item.currency,
    status: "pending",
    parent_id: parent,
    created_at: now,
  };
  db.insert("offers", value);
  addMessage(db, conv, sender, "Offer submitted", now, null, value.id);
  return value;
}
export function registerCommunity(register: Register): void {
  register("GET", "/api/cities/", () =>
    Object.entries(CITIES).map(([id, name]) => ({ id, name })),
  );
  register("GET", "/api/categories/", () =>
    Object.entries(CATEGORY_FIELDS).map(([id, value]) => ({
      id,
      name: value.name,
      attribute_fields: value.fields,
    })),
  );
  register("GET", "/api/countries/", () =>
    [
      ["GB", "United Kingdom", "+44"],
      ["US", "United States", "+1"],
      ["AE", "United Arab Emirates", "+971"],
      ["AU", "Australia", "+61"],
    ].map(([id, name, dial_code]) => ({ id, name, dial_code })),
  );
  register("GET", "/api/legal/:document/", (ctx) => ({
    document: ctx.params.document,
    title: ctx.params
      .document!.split("-")
      .map((s) => s[0]!.toUpperCase() + s.slice(1))
      .join(" "),
    body: "Development placeholder copy. Use approved legal text before a live release.",
    version: "demo-1",
  }));
  register("GET", "/api/members/", (ctx) => {
    ctx.user();
    const q = `%${ctx.query.q ?? ""}%`;
    return page(
      ctx.db
        .all<{ id: string }>(
          "SELECT id FROM users WHERE deleted_at IS NULL AND (username LIKE ? OR first_name LIKE ? OR last_name LIKE ?) ORDER BY username",
          [q, q, q],
        )
        .map((r) => member(ctx.db, r.id)),
      ctx.query.offset,
      ctx.query.limit,
    );
  });
  register("GET", "/api/members/:member_id/", (ctx) => {
    ctx.user();
    return member(ctx.db, ctx.params.member_id!);
  });
  register("GET", "/api/members/:member_id/listings/", (ctx) => {
    const user = ctx.user();
    member(ctx.db, ctx.params.member_id!);
    return page(
      ctx.db
        .all<{ id: string }>(
          "SELECT id FROM listings WHERE seller_id=? AND status='active' ORDER BY created_at DESC,id",
          [ctx.params.member_id!],
        )
        .map((r) => listing(ctx.db, r.id, user.id)),
      ctx.query.offset,
      ctx.query.limit,
    );
  });
  register("GET", "/api/search/suggestions/", (ctx) => {
    const user = ctx.user(),
      q = ctx.query.q;
    const items = q ? searchItems(ctx.db, user.id, { q }) : [];
    return {
      suggestions: items
        .slice(0, 5)
        .map((i) => ({ text: i.title, category_id: i.category_id })),
      recent: ctx.db
        .all<{ query: string }>(
          "SELECT query,max(created_at) AS last FROM search_history WHERE user_id=? GROUP BY query ORDER BY last DESC LIMIT 5",
          [user.id],
        )
        .map((r) => r.query),
      popular: ["Tickets", "Holiday home", "Yard sale"],
    };
  });
  register("GET", "/api/yard-sales/current/", (ctx) =>
    yardSale(ctx.db, ctx.user().id, ctx.now),
  );
  register("POST", "/api/yard-sales/:sale_id/register/", (ctx) => {
    const user = ctx.user(),
      sale = ctx.db.one<Sale>("SELECT * FROM yard_sales WHERE id=?", [
        ctx.params.sale_id!,
      ]);
    if (!sale) fail(404, "not_found", "Yard sale not found");
    if (ctx.now >= sale.registration_closes_at)
      fail(409, "registration_closed", "Registration has closed");
    ctx.db.run("INSERT OR IGNORE INTO yard_sale_registrations VALUES (?,?)", [
      sale.id,
      user.id,
    ]);
    return { ...sale, registration_status: "open", registered: true };
  });
  register("GET", "/api/feed/", (ctx) => {
    const user = ctx.user();
    let items = searchItems(ctx.db, user.id, {
      category_id: ctx.query.category_id,
      city_id: user.city_id ?? undefined,
    });
    if (ctx.query.preferred_only)
      items = items.filter((i) =>
        (user.category_ids ?? []).includes(i.category_id),
      );
    return {
      listings: page(items, ctx.query.offset, ctx.query.limit),
      sponsorship_count: user.sponsorship_count,
      required_sponsors: 3,
      notifications_enabled: user.notifications_enabled,
      unread_notifications: ctx.db.one<{ count: number }>(
        "SELECT count(*) AS count FROM notifications WHERE user_id=? AND read_at IS NULL",
        [user.id],
      )!.count,
      category_ids: user.category_ids,
      yard_sale: yardSale(ctx.db, user.id, ctx.now),
    };
  });
  register("GET", "/api/notifications/", (ctx) => {
    const values = ctx.db.all<Notification>(
      "SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC,id",
      [ctx.user().id],
    );
    return page(
      values
        .filter((n) => !ctx.query.unread_only || n.read_at === null)
        .map(({ user_id, ...n }) => n),
      ctx.query.offset,
      ctx.query.limit,
    );
  });
  register("PATCH", "/api/notifications/:notification_id/read/", (ctx) => {
    const value = ctx.db.one<Notification>(
      "SELECT * FROM notifications WHERE id=? AND user_id=?",
      [ctx.params.notification_id!, ctx.user().id],
    );
    if (!value) fail(404, "not_found", "Notification not found");
    if (value.read_at === null) {
      value.read_at = ctx.now;
      ctx.db.update("notifications", { read_at: ctx.now }, "id=?", [value.id]);
    }
    const { user_id, ...result } = value;
    return result;
  });
  register("GET", "/api/sponsors/suggestions/", (ctx) => {
    const user = ctx.user();
    return page(
      ctx.db
        .all<{ id: string }>(
          "SELECT id FROM users WHERE id<>? AND deleted_at IS NULL AND id NOT IN (SELECT sponsor_id FROM sponsorships WHERE requester_id=?) ORDER BY id",
          [user.id, user.id],
        )
        .map((r) => member(ctx.db, r.id)),
    );
  });
  register("GET", "/api/sponsorships/", (ctx) => {
    const user = ctx.user();
    return {
      incoming: ctx.db.all(
        "SELECT * FROM sponsorships WHERE sponsor_id=? ORDER BY created_at,id",
        [user.id],
      ),
      outgoing: ctx.db.all(
        "SELECT * FROM sponsorships WHERE requester_id=? ORDER BY created_at,id",
        [user.id],
      ),
      accepted_count: countSponsors(ctx.db, user.id),
      required_count: 3,
    };
  });
  register<Schema<"SponsorRequest">>(
    "POST",
    "/api/sponsorships/",
    (ctx, body) => {
      const user = ctx.user(),
        db = ctx.db;
      if (body.sponsor_id === user.id)
        fail(422, "self_sponsorship", "Choose another member");
      member(db, body.sponsor_id);
      if (
        db.one(
          "SELECT id FROM sponsorships WHERE requester_id=? AND sponsor_id=?",
          [user.id, body.sponsor_id],
        )
      )
        fail(409, "request_exists", "A request already exists for this member");
      if (
        db.one(
          "SELECT id FROM sponsorships WHERE requester_id=? AND sponsor_id=? AND status='accepted'",
          [body.sponsor_id, user.id],
        ) &&
        countSponsors(db, user.id) < 3
      )
        fail(
          403,
          "sponsors_required",
          "Complete your three sponsorships before sponsoring back",
        );
      const value = {
        id: uid(),
        requester_id: user.id,
        sponsor_id: body.sponsor_id,
        relationship: body.relationship ?? "friend",
        status: "pending",
        created_at: ctx.now,
      };
      db.insert("sponsorships", value);
      notify(
        db,
        body.sponsor_id,
        "sponsorship",
        "New sponsorship request",
        "sponsorship",
        value.id,
        ctx.now,
      );
      ctx.reply.code(201);
      return value;
    },
  );
  register<Schema<"SponsorDecision">>(
    "PATCH",
    "/api/sponsorships/:sponsorship_id/",
    (ctx, body) => {
      const user = ctx.user(),
        db = ctx.db,
        value = db.one<Sponsorship>("SELECT * FROM sponsorships WHERE id=?", [
          ctx.params.sponsorship_id!,
        ]);
      if (!value) fail(404, "not_found", "Request not found");
      if (value.sponsor_id !== user.id)
        fail(403, "forbidden", "Only the sponsor can decide this request");
      if (value.status !== "pending")
        fail(409, "already_decided", "This request has already been decided");
      if (
        body.status === "accepted" &&
        db.one(
          "SELECT id FROM sponsorships WHERE requester_id=? AND sponsor_id=? AND status='accepted'",
          [user.id, value.requester_id],
        ) &&
        countSponsors(db, user.id) < 3
      )
        fail(
          403,
          "sponsors_required",
          "Complete your three sponsorships before sponsoring back",
        );
      db.update("sponsorships", { status: body.status }, "id=?", [value.id]);
      notify(
        db,
        value.requester_id,
        "sponsorship",
        "Sponsorship " + body.status,
        "sponsorship",
        value.id,
        ctx.now,
      );
      return { ...value, status: body.status };
    },
  );
  register<Schema<"ConversationCreate">>(
    "POST",
    "/api/conversations/",
    (ctx, body) => {
      const user = ctx.user();
      if (body.kind === "listing" && !body.listing_id)
        fail(422, "listing_required", "Choose the listing to discuss");
      if (body.kind === "concierge" && body.listing_id)
        fail(
          422,
          "invalid_listing",
          "Concierge conversations do not attach a listing",
        );
      const value = openConversation(
        ctx.db,
        user.id,
        body.kind,
        body.listing_id ?? null,
        body.topic ?? "general",
        ctx.now,
      );
      ctx.reply.code(201);
      return value;
    },
  );
  register("GET", "/api/conversations/", (ctx) =>
    page(
      ctx.db.all(
        "SELECT co.* FROM conversations co JOIN conversation_members cm ON cm.conversation_id=co.id WHERE cm.user_id=? ORDER BY co.created_at DESC,co.id",
        [ctx.user().id],
      ),
      ctx.query.offset,
      ctx.query.limit,
    ),
  );
  register("GET", "/api/conversations/:conversation_id/messages/", (ctx) => {
    conversationAccess(ctx.db, ctx.params.conversation_id!, ctx.user().id);
    return page(
      ctx.db.all(
        "SELECT * FROM messages WHERE conversation_id=? ORDER BY created_at,rowid",
        [ctx.params.conversation_id!],
      ),
      ctx.query.offset,
      ctx.query.limit,
    );
  });
  register<Schema<"MessageCreate">>(
    "POST",
    "/api/conversations/:conversation_id/messages/",
    (ctx, body) => {
      const user = ctx.user(),
        db = ctx.db,
        conv = conversationAccess(db, ctx.params.conversation_id!, user.id);
      if (
        conv.closed_at !== null ||
        (conv.kind === "concierge" && conv.created_at <= ctx.now - 86400)
      )
        fail(409, "conversation_closed", "Start a new conversation");
      if (
        body.photo_id &&
        !db.one("SELECT id FROM media WHERE id=? AND owner_id=?", [
          body.photo_id,
          user.id,
        ])
      )
        fail(422, "invalid_photo", "Upload the message photo first");
      const message = addMessage(
        db,
        conv.id,
        user.id,
        body.text,
        ctx.now,
        body.photo_id ?? null,
      );
      if (conv.kind === "concierge")
        addMessage(
          db,
          conv.id,
          null,
          "[Simulated concierge] Your message has been received. No external service was contacted.",
          ctx.now,
        );
      ctx.reply.code(201);
      return message;
    },
  );
  register("POST", "/api/conversations/:conversation_id/close/", (ctx) => {
    const conv = conversationAccess(
      ctx.db,
      ctx.params.conversation_id!,
      ctx.user().id,
    );
    ctx.db.update("conversations", { closed_at: ctx.now }, "id=?", [conv.id]);
    ctx.db.run(
      "UPDATE offers SET status='declined' WHERE conversation_id=? AND status='pending'",
      [conv.id],
    );
    return { ...conv, closed_at: ctx.now };
  });
  register<Schema<"OfferCreate">>(
    "POST",
    "/api/listings/:listing_id/offers/",
    (ctx, body) => {
      const user = ctx.user(),
        db = ctx.db,
        item = listing(db, ctx.params.listing_id!, user.id);
      if (item.seller_id === user.id)
        fail(422, "own_listing", "You cannot offer on your own listing");
      if (
        item.status !== "active" ||
        db.one(
          "SELECT id FROM offers WHERE listing_id=? AND status='accepted'",
          [item.id],
        )
      )
        fail(
          409,
          "listing_unavailable",
          "This listing is unavailable for offers",
        );
      const conv = openConversation(
        db,
        user.id,
        "listing",
        item.id,
        "general",
        ctx.now,
      );
      if (
        db.one(
          "SELECT id FROM offers WHERE conversation_id=? AND status='pending'",
          [conv.id],
        )
      )
        fail(409, "offer_pending", "Wait for a decision on the current offer");
      const value = createOffer(
        db,
        item,
        conv.id,
        user.id,
        item.seller_id,
        body.amount_minor,
        ctx.now,
      );
      ctx.reply.code(201);
      return value;
    },
  );
  register("GET", "/api/offers/:offer_id/", (ctx) => {
    const user = ctx.user(),
      value = ctx.db.one<Offer>("SELECT * FROM offers WHERE id=?", [
        ctx.params.offer_id!,
      ]);
    if (!value) fail(404, "not_found", "Offer not found");
    conversationAccess(ctx.db, value.conversation_id, user.id);
    return value;
  });
  register<Schema<"OfferAction">>(
    "PATCH",
    "/api/offers/:offer_id/",
    (ctx, body) => {
      const user = ctx.user(),
        db = ctx.db,
        value = db.one<Offer>("SELECT * FROM offers WHERE id=?", [
          ctx.params.offer_id!,
        ]);
      if (!value) fail(404, "not_found", "Offer not found");
      if (value.recipient_id !== user.id)
        fail(403, "forbidden", "Only the recipient can act on this offer");
      const conv = conversationAccess(db, value.conversation_id, user.id);
      if (conv.closed_at !== null)
        fail(409, "conversation_closed", "This conversation is closed");
      const item = listing(db, value.listing_id, user.id);
      if (
        item.status !== "active" ||
        value.status !== "pending" ||
        db.one(
          "SELECT id FROM offers WHERE listing_id=? AND status='accepted'",
          [item.id],
        )
      )
        fail(409, "offer_closed", "This offer can no longer be changed");
      if ((body.action === "counter") !== (body.amount_minor != null))
        fail(422, "invalid_counter", "Only counteroffers require an amount");
      const status = {
        accept: "accepted",
        decline: "declined",
        counter: "countered",
      }[body.action];
      db.update("offers", { status }, "id=?", [value.id]);
      if (body.action === "counter")
        return createOffer(
          db,
          item,
          value.conversation_id,
          user.id,
          value.sender_id,
          body.amount_minor!,
          ctx.now,
          value.id,
        );
      if (body.action === "accept")
        db.run(
          "UPDATE offers SET status='declined' WHERE listing_id=? AND status='pending'",
          [item.id],
        );
      addMessage(
        db,
        value.conversation_id,
        user.id,
        "Offer " + status,
        ctx.now,
        null,
        value.id,
      );
      return { ...value, status };
    },
  );
  register<Schema<"ReportCreate">>("POST", "/api/reports/", (ctx, body) => {
    const user = ctx.user();
    listing(ctx.db, body.listing_id, user.id);
    const value = { id: uid(), user_id: user.id, ...body, created_at: ctx.now };
    ctx.db.insert("reports", value);
    const { user_id, ...result } = value;
    ctx.reply.code(201);
    return { ...result, status: "received" };
  });
}
