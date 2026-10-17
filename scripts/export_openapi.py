"""Regenerate the portable contract without modifying a developer's data."""

import json
from pathlib import Path
import sys
import tempfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import yaml
from openapi_spec_validator import validate
from app.factory import create_app

root = Path(__file__).resolve().parents[1]
with tempfile.TemporaryDirectory() as tmp:
    app = create_app(str(Path(tmp) / "export.sqlite3"))
    spec = app.openapi()
    spec["servers"] = [
        {
            "url": "http://127.0.0.1:8765",
            "description": "Local development; configure a LAN URL for a physical mobile device",
        }
    ]
    validate(spec)
    (root / "openapi.json").write_text(json.dumps(spec, indent=2) + "\n")
    (root / "openapi.yaml").write_text(yaml.safe_dump(spec, sort_keys=False, allow_unicode=True))
    operations = sum(
        k in ("get", "post", "put", "patch", "delete")
        for path in spec["paths"].values()
        for k in path
    )
    print(f"Validated and exported {operations} operations across {len(spec['paths'])} paths.")
