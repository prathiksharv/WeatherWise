import React, { useState } from "react";
import axios from "axios";
import WeatherResult from "./WeatherResult";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setWeatherData(null);

    try {
      // Send city to the backend API
    //   const response = await axios.post("http://127.0.0.1:8000/weather/", { city });
      const response = await axios.post("http://127.0.0.1:8000/weather/", {
            city: city,  // Send city in a JSON object
            });
      setWeatherData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  return (
    <div>
      <h1>WeatherWise</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter City Name:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && <WeatherResult data={weatherData} />}
    </div>
  );
};

export default WeatherForm;
