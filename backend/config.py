from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access API keys from environment variables
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
WEATHERAPI_API_KEY = os.getenv("WEATHERAPI_API_KEY")
OPENAI_API_KEY= os.getenv("OPENAI_API_KEY")

# Check if keys are missing and raise an error if necessary
if not OPENWEATHER_API_KEY:
    raise ValueError("OPENWEATHER_API_KEY is missing from .env file.")
if not WEATHERAPI_API_KEY:
    raise ValueError("WEATHERAPI_API_KEY is missing from .env file.")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is missing from .env file.")

