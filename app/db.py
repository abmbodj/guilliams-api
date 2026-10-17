from contextlib import contextmanager
import hashlib
import json
from pathlib import Path
import secrets
import sqlite3
from .catalog import CITIES, CATEGORY_FIELDS


def password_hash(password):
    salt = secrets.token_hex(16)
    digest = hashlib.scrypt(password.encode(), salt=salt.encode(), n=16384, r=8, p=1).hex()
    return f"{salt}:{digest}"


def password_matches(password, stored):
    if not stored:
        return False
    salt, digest = stored.split(":")
    actual = hashlib.scrypt(password.encode(), salt=salt.encode(), n=16384, r=8, p=1).hex()
    return secrets.compare_digest(actual, digest)


def token_hash(token):
    return hashlib.sha256(token.encode()).hexdigest()


def uid():
    return secrets.token_hex(12)


class Database:
    def __init__(self, path, now):
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        self.path = path
        with self.connect() as c:
            c.executescript(Path(__file__).with_name("schema.sql").read_text())
            c.executemany("INSERT OR IGNORE INTO cities VALUES (?,?)", CITIES.items())
            c.executemany(
                "INSERT OR IGNORE INTO categories VALUES (?,?)",
                [(k, v[0]) for k, v in CATEGORY_FIELDS.items()],
            )
            if not c.execute("SELECT 1 FROM users LIMIT 1").fetchone():
                self.seed(c, now)

    @contextmanager
    def connect(self):
        c = sqlite3.connect(self.path, timeout=10, check_same_thread=False)
        c.row_factory = sqlite3.Row
        c.execute("PRAGMA foreign_keys=ON")
        try:
            yield c
            c.commit()
        except BaseException:
            c.rollback()
            raise
        finally:
            c.close()

    def seed(self, c, now):
        for i, name in enumerate(["alice", "bob", "carol", "sponsor-a", "sponsor-b", "sponsor-c"]):
            c.execute(
                "INSERT INTO users(id,username,password_hash,phone,email,first_name,last_name,city_id,house_rules_accepted,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)",
                (
                    name,
                    name,
                    password_hash("DemoPass123!"),
                    f"+44770090000{i}",
                    f"{name}@example.test",
                    name.title(),
                    "Example",
                    "london",
                    1,
                    now,
                ),
            )
            c.execute("INSERT INTO user_categories VALUES (?,?,?)", (name, "yard-sale", 0))
        for sponsor in ["sponsor-a", "sponsor-b", "sponsor-c"]:
            c.execute(
                "INSERT INTO sponsorships VALUES (?,?,?,?,?,?)",
                (uid(), "alice", sponsor, "friend", "accepted", now),
            )
        for k, (name, fields) in CATEGORY_FIELDS.items():
            attrs = {}
            if k == "cars-boats":
                attrs = {"vehicle_type": "cars", "year": 2020, "mileage_km": 12000}
            elif k == "tickets":
                attrs = {"ticket_count": 2, "ticket_type": "sport", "dates": ["2027-01-01"]}
            c.execute(
                "INSERT INTO listings(id,seller_id,title,description,category_id,city_id,postal_code,town,price_minor,currency,price_unit,attributes,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (
                    "demo-chair" if k == "yard-sale" else "demo-" + k,
                    "alice",
                    "Demo chair" if k == "yard-sale" else "Demo " + name,
                    "Fictional Phase 1 example. No real transaction.",
                    k,
                    "london",
                    "SW1A 1AA",
                    "London",
                    8000,
                    "GBP",
                    "item",
                    json.dumps(attrs),
                    "active",
                    now,
                    now,
                ),
            )
        c.execute(
            "INSERT INTO yard_sales VALUES (?,?,?,?)",
            ("demo-yard-sale", now + 172800, now + 259200, now + 86400),
        )
