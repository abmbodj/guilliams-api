import sqlite3
import time
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.openapi.docs import get_swagger_ui_html
from pydantic import ValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from . import models, auth, sponsoring, listings, messaging, discovery
from .db import Database


def create_app(db_path="data/guilliams.sqlite3", demo_mode=True, clock=time.time):
    app = FastAPI(
        title="Guilliams Mobile API",
        docs_url=None,
        redoc_url=None,
        version="0.1.0",
        description="Phase 1 development API. No external integrations. Demo code authentication is explicitly simulated.",
        responses={
            code: {"model": models.ErrorResponse, "description": description}
            for code, description in [
                (401, "Missing, invalid or expired session"),
                (403, "Operation forbidden"),
                (404, "Resource unavailable"),
                (409, "Conflicting state"),
                (410, "Verification expired"),
                (413, "Image too large"),
                (422, "Invalid input"),
                (429, "Verification cooldown or attempt limit"),
                (503, "Simulation disabled"),
            ]
        },
    )
    app.mount(
        "/docs-assets",
        StaticFiles(directory=Path(__file__).resolve().parents[1] / "static" / "swagger"),
        name="docs-assets",
    )

    @app.get("/docs", include_in_schema=False)
    def swagger_docs():
        return get_swagger_ui_html(
            openapi_url="/openapi.json",
            title="Guilliams Mobile API — Swagger",
            swagger_js_url="/docs-assets/swagger-ui-bundle.js",
            swagger_css_url="/docs-assets/swagger-ui.css",
            swagger_favicon_url="/docs-assets/favicon-32x32.png",
            swagger_ui_parameters={"persistAuthorization": False, "validatorUrl": None},
        )

    app.state.clock = clock
    app.state.demo_mode = demo_mode
    app.state.database = Database(db_path, clock())

    @app.exception_handler(StarletteHTTPException)
    async def http_error(request: Request, exc: HTTPException):
        detail = (
            exc.detail
            if isinstance(exc.detail, dict)
            else {"code": "http_error", "message": str(exc.detail), "fields": []}
        )
        return JSONResponse({"error": detail}, status_code=exc.status_code, headers=exc.headers)

    async def validation_error(request, exc):
        fields = [
            {"path": ".".join(str(x) for x in e["loc"]), "message": e["msg"]} for e in exc.errors()
        ]
        return JSONResponse(
            {
                "error": {
                    "code": "validation_error",
                    "message": "Check the submitted fields",
                    "fields": fields,
                }
            },
            status_code=422,
        )

    app.add_exception_handler(RequestValidationError, validation_error)
    app.add_exception_handler(ValidationError, validation_error)

    @app.exception_handler(sqlite3.IntegrityError)
    async def integrity_error(request, exc):
        return JSONResponse(
            {
                "error": {
                    "code": "conflict",
                    "message": "A unique value or relationship conflicts with existing data",
                    "fields": [],
                }
            },
            status_code=409,
        )

    @app.get("/api/health/", response_model=models.Health, tags=["Health"])
    def health():
        return {"status": "ok", "mode": "development-simulated" if demo_mode else "password-only"}

    for router in [
        auth.router,
        discovery.router,
        sponsoring.router,
        listings.router,
        messaging.router,
    ]:
        app.include_router(router)
    return app
