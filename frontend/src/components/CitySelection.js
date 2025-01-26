import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import logToBackend from "../logger.js"; // Import the logger utility

const CitySelection = () => {
  const navigate = useNavigate();
  const cities = ["New York", "San Francisco", "Boston", "Seattle", "Chicago"];

  const handleCityClick = async (city) => {
    await logToBackend("info", `City selected: ${city}`);
    try {
      // Fetch weather data from backend
      const response = await axios.post("http://127.0.0.1:8000/weather/", {
        city: city,
      });
      const weatherData = response.data;
      await logToBackend(
        "info",
        `Weather data fetched successfully from backend in CitySelection.js for ${city}: ${JSON.stringify(weatherData)}`
      );
  
      navigate("/result", { state: { city, weatherData } });
    } catch (err) {
      await logToBackend("error", `Error fetching weather data for ${city}: ${err}`);
    }
  };

  return (
    <div className="city-selection">
      <h1>Select a City</h1>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>
            <button onClick={() => handleCityClick(city)}>{city}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySelection;
