import React from "react";

const WeatherResult = ({ data }) => {
  return (
    <div>
      <h2>Weather Data for {data.city}</h2>
      <p><strong>API 1:</strong> {data.temperature_api_1}°C, {data.description_api_1}</p>
      <p><strong>API 2:</strong> {data.temperature_api_2}°C, {data.description_api_2}</p>
    </div>
  );
};

export default WeatherResult;
