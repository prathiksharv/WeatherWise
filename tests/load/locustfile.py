from locust import HttpUser, task, between

class WeatherUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def get_weather(self):
        self.client.post("/weather/", json={"city": "Boston"})

    @task
    def process_query(self):
        weather_data = {"temperature": 22.5, "description": "clear sky"}
        self.client.post("/query/", json={
            "city": "Boston",
            "weather_data": weather_data,
            "query": "Is it sunny?"
        })

# Steps to Start Locust:
# 1. Start the FastAPI server:
#    uvicorn backend.main:app --reload
#
# 2. Start Locust from the project root:
#    locust -f backend/tests/load/locustfile.py --host=http://127.0.0.1:8000
#
# 3. Open Locust UI:
#    Open browser → http://localhost:8089
#
# 4. Set Load Parameters:
#    - Number of users: 50
#    - Spawn rate: 5
#    - Hit "Start"
#
# 5. Monitor Results:
#    - Check response time, RPS, and failures in real-time.
#
# 6. Stop Locust:
#    - Stop Locust with Ctrl + C in terminal.
