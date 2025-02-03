import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import { MdDescription } from "react-icons/md";
import logToBackend from "../logger.js";

const WeatherResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, weatherData } = location.state || {};

  if (!city || !weatherData) {
    logToBackend("error", "Invalid data passed to WeatherResult. Missing city or weatherData.");
    return <p className="text-center text-danger">Invalid request. Please go back and try again.</p>;
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
    navigate("/query", { state: { city, weatherData: averagedWeatherData } });
  };

  return (
    <div
      className="weather-result d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/worldmap.jpg')", // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="card shadow p-4" style={{ width: "40%", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <h1 className="text-center text-primary mb-4">Weather Results for {city}</h1>
        <div className="weather-details">
          <p>
            <FaTemperatureHigh className="icon" />
            <strong> Temperature:</strong> {averageTemperature.toFixed(2)}°C
          </p>
          <p>
            <FaTemperatureHigh className="icon" />
            <strong> Feels Like:</strong> {averageFeelsLike.toFixed(2)}°C
          </p>
          <p>
            <WiHumidity className="icon" />
            <strong> Humidity:</strong> {averageHumidity.toFixed(2)}%
          </p>
          <p>
            <FaWind className="icon" />
            <strong> Wind Speed:</strong> {averageWindSpeed.toFixed(2)} km/h
          </p>
          <p>
            <WiBarometer className="icon" />
            <strong> Pressure:</strong> {averagePressure.toFixed(2)} hPa
          </p>
          <p>
            <MdDescription className="icon" />
            <strong> Description:</strong> {combinedDescription}
          </p>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleAskQuestion}>
            Ask a Weather Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherResult;
