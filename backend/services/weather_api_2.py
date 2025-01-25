import requests
from backend.config import WEATHERAPI_API_KEY  # Import API key from config

BASE_URL = "https://api.weatherapi.com/v1/current.json"

def get_weather_api_2(location: str):
    """
    Fetches weather data from WeatherAPI for a given location.

    Args:
        location (str): City or location name.

    Returns:
        dict: Weather data containing temperature and description.
    """
    params = {"q": location, "key": WEATHERAPI_API_KEY}
    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        return {
            "temperature": data["current"]["temp_c"],
            "description": data["current"]["condition"]["text"],
        }
    else:
        raise Exception(f"Error from WeatherAPI: {response.text}")
