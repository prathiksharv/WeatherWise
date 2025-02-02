// import React from "react";
// import { useLocation } from "react-router-dom";
// import logToBackend from "../logger.js";

// const WeatherResult = () => {
//   const location = useLocation();
//   const { city, weatherData } = location.state || {}; // Get city and weather data from state

//   // Validate data
//   if (!city || !weatherData || !weatherData.data) {
//     logToBackend(
//       "error",
//       "Invalid data passed to WeatherResult. Missing city or weatherData."
//     );
//     return <p>Invalid request. Please go back and try again.</p>;
//   }

//   const { data } = weatherData;

//   // Log the weather data for debugging
//   logToBackend("info", `Displaying weather data for city in WeatherResult.js: ${city}`);
//   logToBackend("info", `Weather data displayed in WeatherResult.js: ${JSON.stringify(data)}`);

//   return (
//     <div className="weather-result">
//       <h1>Weather Results for {city}</h1>
//       <p>
//         <strong>Temperature:</strong>
//         <br />
//         API 1: {data.temperature.api_1 || "N/A"}°C
//         <br />
//         API 2: {data.temperature.api_2 || "N/A"}°C
//       </p>
//       <p>
//         <strong>Feels Like:</strong>
//         <br />
//         API 1: {data.feels_like.api_1 || "N/A"}°C
//         <br />
//         API 2: {data.feels_like.api_2 || "N/A"}°C
//       </p>
//       <p>
//         <strong>Humidity:</strong>
//         <br />
//         API 1: {data.humidity.api_1 || "N/A"}%
//         <br />
//         API 2: {data.humidity.api_2 || "N/A"}%
//       </p>
//       <p>
//         <strong>Pressure:</strong>
//         <br />
//         API 1: {data.pressure.api_1 || "N/A"} hPa
//         <br />
//         API 2: {data.pressure.api_2 || "N/A"} hPa
//       </p>
//       <p>
//         <strong>Wind Speed:</strong>
//         <br />
//         API 1: {data.wind_speed.api_1 || "N/A"} m/s
//         <br />
//         API 2: {data.wind_speed.api_2 || "N/A"} km/h
//       </p>
//       <p>
//         <strong>Description:</strong>
//         <br />
//         API 1: {data.description.api_1 || "N/A"}
//         <br />
//         API 2: {data.description.api_2 || "N/A"}
//       </p>
//       <p>
//         <strong>Summary:</strong>
//         <br />
//         {data.summary || "N/A"}
//       </p>
//     </div>
//   );
// };

// export default WeatherResult;


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

  const handleAskQuestion = () => {
    navigate("/query", { state: { city, weatherData } }); // Pass data to the query page
  };

  return (
    <div className="weather-result">
      <h1>Weather Results for {city}</h1>
      <p>
        <strong>Temperature (API 1):</strong> {weatherData.data.temperature.api_1}°C
      </p>
      <p>
        <strong>Description (API 1):</strong> {weatherData.data.description.api_1}
      </p>
      <p>
        <strong>Temperature (API 2):</strong> {weatherData.data.temperature.api_2}°C
      </p>
      <p>
        <strong>Description (API 2):</strong> {weatherData.data.description.api_2}
      </p>
      <p>
        <strong>Humidity:</strong> {weatherData.data.humidity.api_1}%
      </p>
      <p>
        <strong>Wind Speed:</strong> {weatherData.data.wind_speed.api_1} km/h
      </p>

      {/* Add a button to navigate to the WeatherQuery page */}
      <button onClick={handleAskQuestion}>Ask a Weather Question</button>
    </div>
  );
};

export default WeatherResult;
