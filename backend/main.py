from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Add CORS
from pydantic import BaseModel  # Import Pydantic for request validation
from backend.services.weather_api_1 import get_weather_api_1
from backend.services.weather_api_2 import get_weather_api_2
from backend.services.preprocessing import preprocess_weather_data  # Import preprocessing


app = FastAPI()

# Allow CORS for frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update if your React app runs elsewhere
    allow_methods=["*"],
    allow_headers=["*"],
)

class CityRequest(BaseModel):
    city: str  # Define the structure of the request body


@app.get("/")
def home():
    return {"message": "WeatherWise backend is running!"}


# @app.post("/weather/")
# def fetch_weather(request: CityRequest):
#     """
#     Fetch weather data for a city from two APIs and return combined results.
#     """
#     city = request.city  # Extract city from the request body
#     try:
#         weather_1 = get_weather_api_1(city)
#         weather_2 = get_weather_api_2(city)
#         return {
#             "city": city,
#             "temperature_api_1": weather_1["temperature"],
#             "description_api_1": weather_1["description"],
#             "temperature_api_2": weather_2["temperature"],
#             "description_api_2": weather_2["description"],
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/weather/")
def fetch_weather(request: CityRequest):
    """
    Fetch weather data for a city from two APIs, preprocess, and return combined results.
    """
    city = request.city
    try:
        weather_1 = get_weather_api_1(city)
        weather_2 = get_weather_api_2(city)
        preprocessed_data = preprocess_weather_data(weather_1, weather_2)  # Preprocess data
        return {
            "city": city,
            "data": preprocessed_data,  # Return preprocessed data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
