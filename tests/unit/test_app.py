# Third party modules
import pytest

# First party modules
from app import create_app


@pytest.fixture
def client():
    application = create_app()
    application.config["TESTING"] = True
    with application.test_client() as client:
        yield client


def test_square(client):
    rv = client.get("/square?number=8")
    assert b"64" == rv.data