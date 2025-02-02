# import logging
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from backend.services.weather_api_1 import get_weather_api_1
# from backend.services.weather_api_2 import get_weather_api_2
# from backend.services.preprocessing import preprocess_weather_data

# # Setup logging
# logging.basicConfig(
#     filename="logger.txt", 
#     level=logging.INFO,
#     format="%(asctime)s - %(levelname)s - %(message)s",
# )

# app = FastAPI()

# # Allow CORS for frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class CityRequest(BaseModel):
#     city: str

# @app.get("/")
# def home():
#     logging.info("Backend home endpoint hit")
#     return {"message": "WeatherWise backend is running!"}

# @app.post("/weather/")
# def fetch_weather(request: CityRequest):
#     city = request.city
#     logging.info(f"Received weather request for city: {city}")
#     try:
#         weather_1 = get_weather_api_1(city)
#         logging.info(f"Successfully fetched data from API 1 for city: {city}")
#         weather_2 = get_weather_api_2(city)
#         logging.info(f"Successfully fetched data from API 2 for city: {city}")
#         preprocessed_data = preprocess_weather_data(weather_1, weather_2)
#         logging.info(f"Successfully preprocessed data for city: {city}")
#         logging.info(f"Preprocessed data: {preprocessed_data}")
        
#         return {"city": city, "data": preprocessed_data}
#     except Exception as e:
#         logging.error(f"Error while fetching weather data for city {city}: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import T5ForConditionalGeneration, T5Tokenizer
import logging

# Import API service functions
from backend.services.weather_api_1 import get_weather_api_1
from backend.services.weather_api_2 import get_weather_api_2
from backend.services.preprocessing import preprocess_weather_data

# Setup logging
logging.basicConfig(
    filename="logger.txt",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models for request validation
class CityRequest(BaseModel):
    city: str

class LogMessage(BaseModel):
    level: str
    message: str

# Logging endpoint
@app.post("/log/")
def log_message(log: LogMessage):
    """
    Logs messages sent from the frontend to the backend logger.
    """
    if log.level.lower() == "info":
        logging.info(log.message)
    elif log.level.lower() == "warning":
        logging.warning(log.message)
    elif log.level.lower() == "error":
        logging.error(log.message)
    else:
        logging.debug(log.message)
    return {"status": "Log received"}

# Weather data endpoint
@app.post("/weather/")
def fetch_weather(request: CityRequest):
    """
    Fetch weather data for a city from two APIs and return combined results.
    """
    city = request.city
    logging.info(f"Received weather request for city: {city}")
    try:
        # Fetch weather data from both APIs
        weather_1 = get_weather_api_1(city)
        weather_2 = get_weather_api_2(city)
        logging.info(f"Fetched weather data for {city} from both APIs")

        # Preprocess the data
        combined_weather = preprocess_weather_data(weather_1, weather_2)
        logging.info(f"Preprocessed weather data for {city}")

        return {
            "city": city,
            "data": combined_weather,
        }
    except Exception as e:
        logging.error(f"Error fetching weather data for {city}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch weather data")

# Load FLAN-T5 model and tokenizer
model_name = "google/flan-t5-base"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

class QueryRequest(BaseModel):
    city: str
    weather_data: dict
    query: str

@app.post("/query/")
def process_query(request: QueryRequest):
    """
    Use FLAN-T5 to process weather data and user queries.
    """
    try:
        city = request.city
        weather_data = request.weather_data
        query = request.query
        logging.info(f"City, Weather Data and Query recieved to backend: {city}, {weather_data}, {query}")

        # Prepare input prompt for FLAN-T5
        prompt = f"""
        Weather data for {city}:
        {weather_data}

        User query: {query}
        
        Provide a concise and informative response based on the above data:
        """

        # Tokenize the input prompt
        inputs = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
        outputs = model.generate(inputs.input_ids, max_length=150, num_beams=4, early_stopping=True)

        # Decode the output
        llm_response = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Log the successful response
        logging.info(f"LLM responded for query '{query}': {llm_response}")

        return {"response": llm_response}
    
    except Exception as e:
        logging.error(f"Error processing query: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing query.")
