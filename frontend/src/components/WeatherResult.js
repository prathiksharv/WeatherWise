
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logToBackend from "../logger.js";

const WeatherResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, weatherData } = location.state || {};

  if (!city || !weatherData) {
    logToBackend("error", "Invalid data passed to WeatherResult. Missing city or weatherData.");
    return <p>Invalid request. Please go back and try again.</p>;
  }

  logToBackend("info", `Displaying weather data for city: ${city}`);

  // Calculate averages
  const averageTemperature =
    (weatherData.data.temperature.api_1 + weatherData.data.temperature.api_2) / 2;
  const averageFeelsLike =
    (weatherData.data.feels_like.api_1 + weatherData.data.feels_like.api_2) / 2;
  const averageHumidity =
    (weatherData.data.humidity.api_1 + weatherData.data.humidity.api_2) / 2;
  const averageWindSpeed =
    (weatherData.data.wind_speed.api_1 + weatherData.data.wind_speed.api_2) / 2;
  const averagePressure =
    (weatherData.data.pressure.api_1 + weatherData.data.pressure.api_2) / 2;
  const combinedDescription = `${weatherData.data.description.api_1}; ${weatherData.data.description.api_2}`;

  // Prepare averaged weather data for query page
  const averagedWeatherData = {
    temperature: averageTemperature,
    feels_like: averageFeelsLike,
    humidity: averageHumidity,
    wind_speed: averageWindSpeed,
    pressure: averagePressure,
    description: combinedDescription,
  };

  const handleAskQuestion = () => {
    navigate("/query", { state: { city, weatherData: averagedWeatherData } }); // Pass averaged data to the query page
  };

  return (
    <div className="weather-result">
      <h1>Weather Results for {city}</h1>
      <p>
        <strong>Temperature:</strong> {averageTemperature.toFixed(2)}°C
      </p>
      <p>
        <strong>Feels Like:</strong> {averageFeelsLike.toFixed(2)}°C
      </p>
      <p>
        <strong>Humidity:</strong> {averageHumidity.toFixed(2)}%
      </p>
      <p>
        <strong>Wind Speed:</strong> {averageWindSpeed.toFixed(2)} km/h
      </p>
      <p>
        <strong>Pressure:</strong> {averagePressure.toFixed(2)} hPa
      </p>
      <p>
        <strong>Description:</strong> {combinedDescription}
      </p>

      {/* Add a button to navigate to the WeatherQuery page */}
      <button onClick={handleAskQuestion}>Ask a Weather Question</button>
    </div>
  );
};

export default WeatherResult;