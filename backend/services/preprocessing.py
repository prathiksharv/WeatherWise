def preprocess_weather_data(weather_data_api_1, weather_data_api_2):
    """
    Preprocess and combine weather data from two APIs into a consistent format.

    Args:
        weather_data_api_1 (dict): Weather data from API 1.
        weather_data_api_2 (dict): Weather data from API 2.

    Returns:
        dict: Preprocessed and combined weather data.
    """
    return {
        "temperature": {
            "api_1": weather_data_api_1["temperature"],
            "api_2": weather_data_api_2["temperature"],
        },
        "feels_like": {
            "api_1": weather_data_api_1["feels_like"],
            "api_2": weather_data_api_2["feels_like"],
        },
        "humidity": {
            "api_1": weather_data_api_1["humidity"],
            "api_2": weather_data_api_2["humidity"],
        },
        "pressure": {
            "api_1": weather_data_api_1["pressure"],
            "api_2": weather_data_api_2["pressure"],
        },
        "wind_speed": {
            "api_1": weather_data_api_1["wind_speed"],
            "api_2": weather_data_api_2["wind_speed"],
        },
        "description": {
            "api_1": weather_data_api_1["description"],
            "api_2": weather_data_api_2["description"],
        },
        "summary": f"API 1: {weather_data_api_1['description']} ({weather_data_api_1['temperature']}°C, Humidity: {weather_data_api_1['humidity']}%)\n"
                   f"API 2: {weather_data_api_2['description']} ({weather_data_api_2['temperature']}°C, Humidity: {weather_data_api_2['humidity']}%)",
    }