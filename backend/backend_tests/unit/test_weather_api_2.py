import unittest
from backend.services.weather_api_2 import get_weather_api_2
from unittest.mock import patch

class TestWeatherAPI2(unittest.TestCase):
    @patch("backend.services.weather_api_2.requests.get")
    def test_get_weather_api_2_success(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            "current": {
                "temp_c": 20.0,
                "feelslike_c": 19.5,
                "humidity": 55,
                "pressure_mb": 1015,
                "wind_kph": 10,
                "condition": {"text": "Partly cloudy"}
            }
        }
        result = get_weather_api_2("Seattle")
        self.assertEqual(result["temperature"], 20.0)
        self.assertEqual(result["description"], "Partly cloudy")

if __name__ == "__main__":
    unittest.main()