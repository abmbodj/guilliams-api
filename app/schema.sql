PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS schema_version (version INTEGER PRIMARY KEY);
INSERT OR IGNORE INTO schema_version VALUES (1);
CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL COLLATE NOCASE,
 password_hash TEXT, phone TEXT UNIQUE, email TEXT UNIQUE COLLATE NOCASE,
 first_name TEXT NOT NULL DEFAULT '', last_name TEXT NOT NULL DEFAULT '',
 city_id TEXT REFERENCES cities(id), photo_id TEXT REFERENCES media(id),
 message_consent INTEGER NOT NULL DEFAULT 0, house_rules_accepted INTEGER NOT NULL DEFAULT 0,
 notifications_enabled INTEGER NOT NULL DEFAULT 0,
 verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK(verification_status IN ('unverified','pending','verified')),
 deleted_at REAL, deletion_reason TEXT, created_at REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS cities (id TEXT PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS user_categories (
 user_id TEXT NOT NULL REFERENCES users(id), category_id TEXT NOT NULL REFERENCES categories(id),
 position INTEGER NOT NULL, PRIMARY KEY(user_id,category_id), UNIQUE(user_id,position)
);
CREATE TABLE IF NOT EXISTS sessions (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires_at REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS challenges (
 id TEXT PRIMARY KEY, channel TEXT NOT NULL, destination TEXT NOT NULL, purpose TEXT NOT NULL,
 user_id TEXT REFERENCES users(id), expires_at REAL NOT NULL, resend_after REAL NOT NULL,
 used INTEGER NOT NULL DEFAULT 0, attempts INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS media (
 id TEXT PRIMARY KEY, owner_id TEXT NOT NULL REFERENCES users(id), filename TEXT NOT NULL,
 content_type TEXT NOT NULL, size INTEGER NOT NULL, bytes BLOB NOT NULL
);
CREATE TABLE IF NOT EXISTS listings (
 id TEXT PRIMARY KEY, seller_id TEXT NOT NULL REFERENCES users(id), title TEXT NOT NULL,
 description TEXT NOT NULL, category_id TEXT NOT NULL REFERENCES categories(id),
 city_id TEXT NOT NULL REFERENCES cities(id), postal_code TEXT NOT NULL, town TEXT NOT NULL,
 price_minor INTEGER NOT NULL CHECK(price_minor>=0), currency TEXT NOT NULL,
 price_unit TEXT NOT NULL, attributes TEXT NOT NULL DEFAULT '{}',
 status TEXT NOT NULL CHECK(status IN ('draft','active','paused','sold','deleted')),
 buyer_id TEXT REFERENCES users(id), created_at REAL NOT NULL, updated_at REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS listing_photos (
 listing_id TEXT NOT NULL REFERENCES listings(id), media_id TEXT NOT NULL REFERENCES media(id),
 position INTEGER NOT NULL, PRIMARY KEY(listing_id,media_id), UNIQUE(listing_id,position)
);
CREATE TABLE IF NOT EXISTS sponsorships (
 id TEXT PRIMARY KEY, requester_id TEXT NOT NULL REFERENCES users(id), sponsor_id TEXT NOT NULL REFERENCES users(id),
 relationship TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('pending','accepted','declined')),
 created_at REAL NOT NULL, CHECK(requester_id<>sponsor_id), UNIQUE(requester_id,sponsor_id)
);
CREATE TABLE IF NOT EXISTS conversations (
 id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK(kind IN ('listing','concierge')), listing_id TEXT REFERENCES listings(id),
 topic TEXT NOT NULL, created_at REAL NOT NULL, closed_at REAL
);
CREATE TABLE IF NOT EXISTS conversation_members (
 conversation_id TEXT NOT NULL REFERENCES conversations(id), user_id TEXT NOT NULL REFERENCES users(id),
 PRIMARY KEY(conversation_id,user_id)
);
CREATE TABLE IF NOT EXISTS offers (
 id TEXT PRIMARY KEY, listing_id TEXT NOT NULL REFERENCES listings(id),
 conversation_id TEXT NOT NULL REFERENCES conversations(id), sender_id TEXT NOT NULL REFERENCES users(id),
 recipient_id TEXT NOT NULL REFERENCES users(id), amount_minor INTEGER NOT NULL CHECK(amount_minor>0),
 currency TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('pending','accepted','declined','countered')),
 parent_id TEXT REFERENCES offers(id), created_at REAL NOT NULL, CHECK(sender_id<>recipient_id)
);
CREATE UNIQUE INDEX IF NOT EXISTS one_accepted_offer ON offers(listing_id) WHERE status='accepted';
CREATE UNIQUE INDEX IF NOT EXISTS one_pending_offer ON offers(conversation_id) WHERE status='pending';
CREATE TABLE IF NOT EXISTS messages (
 id TEXT PRIMARY KEY, conversation_id TEXT NOT NULL REFERENCES conversations(id),
 sender_id TEXT REFERENCES users(id), text TEXT NOT NULL, photo_id TEXT REFERENCES media(id),
 offer_id TEXT REFERENCES offers(id), created_at REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS notifications (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), kind TEXT NOT NULL,
 title TEXT NOT NULL, body TEXT NOT NULL, target_type TEXT NOT NULL, target_id TEXT NOT NULL,
 read_at REAL, created_at REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS favourites (
 user_id TEXT NOT NULL REFERENCES users(id), listing_id TEXT NOT NULL REFERENCES listings(id),
 PRIMARY KEY(user_id,listing_id)
);
CREATE TABLE IF NOT EXISTS reports (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), listing_id TEXT NOT NULL REFERENCES listings(id),
 reason TEXT NOT NULL, message TEXT NOT NULL, created_at REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS search_history (
 id INTEGER PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), query TEXT NOT NULL, created_at REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS yard_sales (
 id TEXT PRIMARY KEY, starts_at REAL NOT NULL, ends_at REAL NOT NULL, registration_closes_at REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS yard_sale_registrations (
 yard_sale_id TEXT NOT NULL REFERENCES yard_sales(id), user_id TEXT NOT NULL REFERENCES users(id),
 PRIMARY KEY(yard_sale_id,user_id)
);
CREATE INDEX IF NOT EXISTS listing_discovery ON listings(status,city_id,category_id);
CREATE INDEX IF NOT EXISTS notification_inbox ON notifications(user_id,created_at);
CREATE INDEX IF NOT EXISTS message_thread ON messages(conversation_id,created_at);
