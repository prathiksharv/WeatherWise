from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_process_query():
    weather_data = {
        "temperature": 22.5,
        "description": "clear sky"
    }
    query = "Is it sunny?"
    response = client.post("/query/", json={"city": "Boston", "weather_data": weather_data, "query": query})

    assert response.status_code == 200
    assert "response" in response.json()
    assert isinstance(response.json()["response"], str)