import unittest
from backend.services.weather_api_1 import get_weather_api_1
from unittest.mock import patch

class TestWeatherAPI1(unittest.TestCase):
    @patch("backend.services.weather_api_1.requests.get")
    def test_get_weather_api_1_success(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            "main": {"temp": 22.5, "feels_like": 21.0, "humidity": 50, "pressure": 1012},
            "wind": {"speed": 5.5},
            "weather": [{"description": "clear sky"}]
        }
        result = get_weather_api_1("Boston")
        self.assertEqual(result["temperature"], 22.5)
        self.assertEqual(result["description"], "clear sky")

if __name__ == "__main__":
    unittest.main()