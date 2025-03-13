from fastapi.testclient import TestClient
from backend.main import app


client = TestClient(app)

def test_fetch_weather():
    response = client.post("/weather/", json={"city": "Boston"})
    assert response.status_code == 200
    assert "data" in response.json()
    assert "temperature" in response.json()["data"]
    assert "description" in response.json()["data"]