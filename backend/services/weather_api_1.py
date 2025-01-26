import requests
from backend.config import OPENWEATHER_API_KEY  # Import API key from config

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

# def get_weather_api_1(location: str):
#     """
#     Fetches weather data from OpenWeather API for a given location.

#     Args:
#         location (str): City or location name.

#     Returns:
#         dict: Weather data containing temperature and description.
#     """
#     params = {"q": location, "appid": OPENWEATHER_API_KEY, "units": "metric"}
#     response = requests.get(BASE_URL, params=params)
#     if response.status_code == 200:
#         data = response.json()
#         return {
#             "temperature": data["main"]["temp"],
#             "description": data["weather"][0]["description"],
#         }
#     else:
#         raise Exception(f"Error from OpenWeather API: {response.text}")

def get_weather_api_1(location: str):
    """
    Fetches weather data from OpenWeather API for a given location.

    Args:
        location (str): City or location name.

    Returns:
        dict: Weather data containing multiple attributes.
    """
    params = {"q": location, "appid": OPENWEATHER_API_KEY, "units": "metric"}
    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        return {
            "temperature": data["main"]["temp"],
            "feels_like": data["main"]["feels_like"],
            "humidity": data["main"]["humidity"],
            "pressure": data["main"]["pressure"],
            "wind_speed": data["wind"]["speed"],
            "visibility": data.get("visibility", "N/A"),  # Optional field
            "description": data["weather"][0]["description"],
        }
    else:
        raise Exception(f"Error from OpenWeather API: {response.text}")
