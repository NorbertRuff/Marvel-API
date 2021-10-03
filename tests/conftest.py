
import pytest

import marvel_api


@pytest.fixture
def client():
    # Prepare before your test
    marvel_api.application.config["TESTING"] = True
    with marvel_api.application.test_client() as client:
        # Give control to your test
        yield client
    # Cleanup after the test run.
    # ... nothing here, for this simple example