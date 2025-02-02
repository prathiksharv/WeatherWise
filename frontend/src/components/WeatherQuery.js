import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const WeatherQuery = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { city, weatherData } = location.state || {};

  const handleQuerySubmit = async () => {
    if (!city || !weatherData) {
      console.error("Missing city or weather data");
      return;
    }
    if (query) {
      setLoading(true);
      setError("");
      try {
        const res = await axios.post("http://127.0.0.1:8000/query/", {
          city: city,
          weather_data: weatherData,
          query: query,
        });
        setResponse(res.data.response);
      } catch (error) {
        console.error("Error fetching LLM response:", error);
        setError("Failed to process the query. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="weather-query">
      <h1>Ask a Weather Question for {city}</h1>
      <textarea
        placeholder="Ask questions like 'Will it rain today?'"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuerySubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Query"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherQuery;
