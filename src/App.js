import React from "react";
import "./App.css";
import Weather from "./components/Weather";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <Weather />
      </div>
    </div>
  );
}

export default App;
