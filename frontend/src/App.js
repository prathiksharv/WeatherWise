// // import React from "react";
// // import WeatherForm from "./components/WeatherForm";
// // import "./App.css";

// // function App() {
// //   return (
// //     <div className="App">
// //       <WeatherForm />
// //     </div>
// //   );
// // }

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CitySelection from "./components/CitySelection";
// import WeatherQuery from "./components/WeatherQuery";
// import WeatherResult from "./components/WeatherResult";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<CitySelection />} />
//         <Route path="/query" element={<WeatherQuery />} />
//         <Route path="/result" element={<WeatherResult />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CitySelection from "./components/CitySelection";
import WeatherResult from "./components/WeatherResult";
import WeatherQuery from "./components/WeatherQuery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CitySelection />} />
        <Route path="/result" element={<WeatherResult />} />
        <Route path="/query" element={<WeatherQuery />} />
      </Routes>
    </Router>
  );
}

export default App;

