import unittest
from fastapi.testclient import TestClient
import sys
from unittest.mock import MagicMock

# Mock the transformers module to avoid loading the model during tests
sys.modules["transformers"] = MagicMock()

from backend.main import app

# Create a TestClient instance to simulate HTTP requests to the FastAPI app
client = TestClient(app)

class TestFetchWeather(unittest.TestCase):
    """
    Test class for the /weather/ endpoint
    """

    def test_fetch_weather(self):
        """
        Test case: Successful weather data retrieval for a valid city.
        - Expected: Status 200 and valid weather data in the response.
        """
        response = client.post("/weather/", json={"city": "Boston"})
        self.assertEqual(response.status_code, 200)  # HTTP 200 = Success
        self.assertIn("data", response.json())  # Ensure 'data' key exists in response
        self.assertIn("temperature", response.json()["data"])  # Check for 'temperature' field
        self.assertIn("description", response.json()["data"])  # Check for 'description' field

    def test_fetch_weather_missing_city(self):
        """
        Test case: Missing 'city' field in the request body.
        - Expected: Status 422 (Unprocessable Entity) and validation error.
        """
        response = client.post("/weather/", json={})  # Empty JSON body
        self.assertEqual(response.status_code, 422)  # HTTP 422 = Validation error
        self.assertIn("detail", response.json())  # Ensure error details are returned

    def test_fetch_weather_invalid_city_type(self):
        """
        Test case: Invalid data type for the 'city' field.
        - Expected: Status 422 and validation error.
        """
        response = client.post("/weather/", json={"city": 123})  # Sending integer instead of string
        self.assertEqual(response.status_code, 422)  # HTTP 422 = Validation error
        self.assertIn("detail", response.json())  # Ensure error details are returned

if __name__ == '__main__':
    # Run all test cases in this class
    unittest.main()
