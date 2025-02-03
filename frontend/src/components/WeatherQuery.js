// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const WeatherQuery = () => {
//   const [query, setQuery] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const { city, weatherData } = location.state || {};

//   const handleQuerySubmit = async () => {
//     if (!city || !weatherData) {
//       console.error("Missing city or weather data");
//       return;
//     }
//     if (query) {
//       setLoading(true);
//       setError("");
//       setResponse(""); // Clear any previous response
//       try {
//         const res = await axios.post("http://127.0.0.1:8000/query/", {
//           city: city,
//           weather_data: weatherData,
//           query: query,
//         });
//         setResponse(res.data.response);
//       } catch (error) {
//         console.error("Error fetching LLM response:", error);
//         setError("Failed to process the query. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div
//       className="weather-query vh-100 d-flex align-items-center justify-content-center"
//       style={{
//         backgroundImage: "url('/images/worldmap.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div
//         className="container p-4"
//         style={{
//           maxWidth: "600px",
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//           borderRadius: "15px",
//         }}
//       >
//         <h1 className="text-center text-primary mb-4">
//           Ask a Weather Question for {city}
//         </h1>

//         {/* Query Input Container */}
//         <div className="card p-3 shadow-sm mb-4">
//           <h4 className="text-secondary text-center">Enter Your Query</h4>
//           <textarea
//             className="form-control mb-3"
//             rows="4"
//             placeholder="Ask questions like 'Will it rain today?'"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button
//             className="btn btn-primary w-100"
//             onClick={handleQuerySubmit}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Query"}
//           </button>
//           {error && <p className="text-danger mt-3 text-center">{error}</p>}
//         </div>

//         {/* Response Output Container (Only display if response exists) */}
//         {response && (
//           <div className="card p-3 shadow-sm">
//             <h4 className="text-secondary text-center">Insights from Weather Data</h4>
//             <p className="mt-3">{response}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeatherQuery;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const WeatherQuery = () => {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(""); // Store the submitted query
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
      setResponse(""); // Clear previous response
      setSubmittedQuery(query); // Store the submitted query
      try {
        const res = await axios.post("http://127.0.0.1:8000/query/", {
          city: city,
          weather_data: weatherData,
          query: query,
        });
        setResponse(res.data.response);
        setQuery(""); // Clear the query input box
      } catch (error) {
        console.error("Error fetching LLM response:", error);
        setError("Failed to process the query. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="weather-query vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('/images/worldmap.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container p-4"
        style={{
          maxWidth: "600px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
        }}
      >
        <h1 className="text-center text-primary mb-4">
          Ask a Weather Question for {city}
        </h1>

        {/* Query Input Container */}
        <div className="card p-3 shadow-sm mb-4">
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="'Is it sunny outside?' OR 'Do I need an umbrella?' OR 'Should I wear warm clothes?'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-primary w-100"
            onClick={handleQuerySubmit}
            disabled={loading}
          >
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </span>
            ) : (
              "Submit Query"
            )}
          </button>
          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </div>

        {/* Response Output Container (Only display if response exists) */}
        {response && (
          <div className="card p-3 shadow-sm">
            <h4 className="text-secondary text-center">
              Insights from Weather Data
            </h4>
            <p className="mt-3">
              <strong style={{ color: "green" }}>Query:</strong> {submittedQuery}
            </p>
            <p className="mt-2">
              <strong style={{ color: "black" }}>Response:</strong> {response}
            </p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mt-3">
            <div
              className="spinner-border text-primary"
              role="status"
              aria-hidden="true"
            ></div>
            <p>Processing your query...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherQuery;

