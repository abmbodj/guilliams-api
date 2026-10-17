"""Check reproducibility, Figma link coverage, SQLite integrity and schema validity."""

import json
from pathlib import Path
import sys
import tempfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from openapi_spec_validator import validate
from app.factory import create_app

root = Path(__file__).resolve().parents[1]
committed = json.loads((root / "openapi.json").read_text())
validate(committed)
with tempfile.TemporaryDirectory() as tmp:
    app = create_app(str(Path(tmp) / "verify.sqlite3"))
    current = app.openapi()
    # servers are an export-time deployment hint, not a separate runtime contract.
    assert {k: v for k, v in committed.items() if k != "servers"} == current, (
        "Regenerate OpenAPI after changing routes/models"
    )
    with app.state.database.connect() as db:
        assert db.execute("PRAGMA foreign_key_check").fetchall() == []
        assert db.execute("PRAGMA integrity_check").fetchone()[0] == "ok"
records = json.loads((root / "docs/mobile-screens.json").read_text())
assert len(records) == 209
assert len({r["id"] for r in records}) == 209
for record in records:
    assert record["figma_url"].endswith(record["id"].replace(":", "-"))
    assert record["shared_routes"] or not record["api_required"], record["id"]
    for route in record["shared_routes"]:
        assert route in committed["paths"], (record["id"], route)
print(
    "Contract matches implementation; 209 unique Figma links mapped; SQLite foreign keys and integrity pass."
)
