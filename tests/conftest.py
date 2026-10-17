from fastapi.testclient import TestClient
import pytest
from app.factory import create_app


@pytest.fixture
def clock():
    return [1800000000.0]


@pytest.fixture
def client(tmp_path, clock):
    with TestClient(create_app(str(tmp_path / "test.sqlite3"), clock=lambda: clock[0])) as c:
        yield c
