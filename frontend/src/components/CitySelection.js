import React from "react";
import { useNavigate } from "react-router-dom";

const CitySelection = () => {
  const navigate = useNavigate();

  const cities = ["New York", "San Francisco", "Boston", "Seattle", "Chicago"];

  const handleCityClick = (city) => {
    // Navigate to the Weather Query page with the selected city
    navigate("/query", { state: { city } });
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
