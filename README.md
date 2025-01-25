
# WeatherWise: Smarter Weather Insights and Forecasting

WeatherWise is a full-stack weather application that allows users to fetch real-time weather data for their chosen city using APIs. It provides temperature, weather conditions, and other details through a seamless integration of a Python backend and a React frontend.

---

## Features
- Fetch weather data using the OpenWeather API.
- User-friendly frontend for input and display.
- Backend API built with FastAPI.
- Dynamic communication between the frontend and backend.

---

## Technologies Used
- **Frontend**: React.js
- **Backend**: FastAPI (Python)
- **API Integration**: OpenWeather API
- **Environment Management**: Python virtual environments (`venv`)

---

## Steps to Run the Application

### Prerequisites
1. Install **Node.js** and **npm** (for the React frontend).
2. Install **Python 3.12+** (for the FastAPI backend).
3. Set up a virtual environment for Python.
4. Obtain an API key from the OpenWeather API.

---

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd WeatherWise/backend
   ```

2. Set up a Python virtual environment:
   ```bash
   python3 -m venv ww_env
   source ww_env/bin/activate  # On Windows, use ww_env\Scripts\activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Add your OpenWeather API key to the `.env` file:
   ```
   OPENWEATHER_API_KEY=your_api_key
   ```

5. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

The backend server should now be running at `http://127.0.0.1:8000`.

---

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend should now be running at `http://localhost:3000`.

---

### Testing the Application
1. Open your browser and visit `http://localhost:3000`.
2. Enter a city name in the input field and click "Search" to view weather details fetched from the API.

---

### Future Enhancements
- Add error handling for invalid city names or API issues.
- Implement additional features like historical weather data.
- Add support for user authentication and personalization.

---

Enjoy using WeatherWise! 🌤️
