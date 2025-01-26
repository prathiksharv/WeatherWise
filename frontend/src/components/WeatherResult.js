// import React from "react";

// const WeatherResult = ({ data }) => {
//   return (
//     <div>
//       <h2>Weather Data for {data.city}</h2>
//       <p><strong>API 1:</strong> {data.temperature_api_1}°C, {data.description_api_1}</p>
//       <p><strong>API 2:</strong> {data.temperature_api_2}°C, {data.description_api_2}</p>
//     </div>
//   );
// };

// export default WeatherResult;

import React from "react";
import { useLocation } from "react-router-dom";

const WeatherResult = () => {
  const location = useLocation();
  const { query, city } = location.state || {};

  return (
    <div className="weather-result">
      <h1>Weather Results</h1>
      <p>
        <strong>City:</strong> {city}
      </p>
      <p>
        <strong>Query:</strong> {query}
      </p>
      <p>
        <strong>Response:</strong> This is where the response from the LLM/API will appear.
      </p>
    </div>
  );
};

export default WeatherResult;

