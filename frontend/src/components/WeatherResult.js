import React from "react";
import { useLocation } from "react-router-dom";
import logToBackend from "../logger.js";

const WeatherResult = () => {
  const location = useLocation();
  const { city, weatherData } = location.state || {}; // Get city and weather data from state

  // Validate data
  if (!city || !weatherData || !weatherData.data) {
    logToBackend(
      "error",
      "Invalid data passed to WeatherResult. Missing city or weatherData."
    );
    return <p>Invalid request. Please go back and try again.</p>;
  }

  const { data } = weatherData;

  // Log the weather data for debugging
  logToBackend("info", `Displaying weather data for city in WeatherResult.js: ${city}`);
  logToBackend("info", `Weather data displayed in WeatherResult.js: ${JSON.stringify(data)}`);

  return (
    <div className="weather-result">
      <h1>Weather Results for {city}</h1>
      <p>
        <strong>Temperature:</strong>
        <br />
        API 1: {data.temperature.api_1 || "N/A"}°C
        <br />
        API 2: {data.temperature.api_2 || "N/A"}°C
      </p>
      <p>
        <strong>Feels Like:</strong>
        <br />
        API 1: {data.feels_like.api_1 || "N/A"}°C
        <br />
        API 2: {data.feels_like.api_2 || "N/A"}°C
      </p>
      <p>
        <strong>Humidity:</strong>
        <br />
        API 1: {data.humidity.api_1 || "N/A"}%
        <br />
        API 2: {data.humidity.api_2 || "N/A"}%
      </p>
      <p>
        <strong>Pressure:</strong>
        <br />
        API 1: {data.pressure.api_1 || "N/A"} hPa
        <br />
        API 2: {data.pressure.api_2 || "N/A"} hPa
      </p>
      <p>
        <strong>Wind Speed:</strong>
        <br />
        API 1: {data.wind_speed.api_1 || "N/A"} m/s
        <br />
        API 2: {data.wind_speed.api_2 || "N/A"} km/h
      </p>
      <p>
        <strong>Description:</strong>
        <br />
        API 1: {data.description.api_1 || "N/A"}
        <br />
        API 2: {data.description.api_2 || "N/A"}
      </p>
      <p>
        <strong>Summary:</strong>
        <br />
        {data.summary || "N/A"}
      </p>
    </div>
  );
};

export default WeatherResult;



