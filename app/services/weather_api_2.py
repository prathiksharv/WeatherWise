import requests

API_KEY = "your_api_key_2"  # Replace with your API key
BASE_URL = "https://api.weatherapi.com/v1/current.json"

def get_weather_api_2(location: str):
    params = {"q": location, "key": API_KEY}
    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        return {
            "temperature": data["current"]["temp_c"],
            "description": data["current"]["condition"]["text"],
        }
    else:
        raise Exception(f"Error from API 2: {response.text}")
