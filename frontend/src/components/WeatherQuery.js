import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WeatherQuery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {};

  const handleAskQuery = (query) => {
    // Replace this with a real API call to send the query to the backend
    console.log(`Query: ${query} for city: ${city}`);
    // Navigate to the result page
    navigate("/result", { state: { query, city } });
  };

  return (
    <div className="weather-query">
      <h1>Ask Weather Questions for {city}</h1>
      <textarea
        placeholder="Type your question here..."
        rows="5"
        cols="40"
      ></textarea>
      <button onClick={() => handleAskQuery("Will it rain today?")}>
        Ask
      </button>
    </div>
  );
};

export default WeatherQuery;
