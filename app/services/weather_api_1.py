import requests

API_KEY = "your_api_key_1"  # Replace with your API key
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_weather_api_1(location: str):
    params = {"q": location, "appid": API_KEY, "units": "metric"}
    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        return {
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
        }
    else:
        raise Exception(f"Error from API 1: {response.text}")
