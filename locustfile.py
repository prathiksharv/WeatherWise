from locust import HttpUser, task, between

class WeatherUser(HttpUser):
    wait_time = between(1, 2)  # Wait time between user requests

    @task
    def get_weather(self):
        # Test the /weather/ endpoint
        self.client.post("/weather/", json={"city": "Boston"})

    @task
    def process_query(self):
        # Test the /query/ endpoint
        weather_data = {"temperature": 22.5, "description": "clear sky"}
        self.client.post("/query/", json={
            "city": "Boston",
            "weather_data": weather_data,
            "query": "Is it sunny?"
        })

# To run Locust:
# start backend server: uvicorn backend.main:app --reload
# locust -f tests/load/locustfile.py --host=http://127.0.0.1:8000
# Open your browser and go to: 👉 http://localhost:8089
# Set:
#     Number of users = 50
#     Spawn rate = 5
# Start the test → Monitor results.


