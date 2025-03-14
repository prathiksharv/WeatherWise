import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logToBackend from "../logger.js";

const CitySelection = () => {
  const navigate = useNavigate();
  const cities = [
    { name: "New York", image: "/images/new_york.jpg" },
    { name: "San Francisco", image: "/images/san_francisco.jpg" },
    { name: "Boston", image: "/images/boston.jpg" },
    { name: "Seattle", image: "/images/seattle.jpg" },
    { name: "Chicago", image: "/images/chicago.jpg" },
    { name: "Miami", image: "/images/miami.jpg" }
  ];

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
        `Weather data fetched successfully for ${city}: ${JSON.stringify(weatherData)}`
      );

      navigate("/result", { state: { city, weatherData } });
    } catch (err) {
      await logToBackend("error", `Error fetching weather data for ${city}: ${err}`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/worldmap.jpg')", // Path to your world map image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        className="text-center mb-4"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          color: "white", // Text color to contrast the background
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)", // Enhanced shadow for visibility
          letterSpacing: "2px",
        }}
      >
        WeatherWise: Personalized Weather Assistance
      </h1>

      <div className="container">
        <div className="row">
          {cities.map((city, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="card shadow-sm position-relative"
                onClick={() => handleCityClick(city.name)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={city.image}
                  className="card-img-top"
                  alt={city.name}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <button
                  className="btn btn-primary position-absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {city.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelection;


