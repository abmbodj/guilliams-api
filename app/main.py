import os
from .factory import create_app

app = create_app(
    os.environ.get("GUILLIAMS_DB", "data/guilliams.sqlite3"),
    demo_mode=os.environ.get("GUILLIAMS_DEMO_MODE", "true").lower() == "true",
)
