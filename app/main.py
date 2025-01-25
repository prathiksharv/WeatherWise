from fastapi import FastAPI, HTTPException
from app.services.weather_api_1 import get_weather_api_1
from app.services.weather_api_2 import get_weather_api_2

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Weather Wise API is running!"}

@app.get("/weather/{location}")
def get_weather(location: str):
    try:
        # Call the respective API services
        weather_1 = get_weather_api_1(location)
        weather_2 = get_weather_api_2(location)

        # Return combined weather data
        return {
            "location": location,
            "api_1_data": weather_1,
            "api_2_data": weather_2
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

