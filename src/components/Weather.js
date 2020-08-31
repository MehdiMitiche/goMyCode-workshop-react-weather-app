import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "../assets/sky.png";

const Weather = () => {
  const API_KEY = "b7ed116b4ea17b35e683037702056cd8";
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setLoading(false);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      setLoading(false);
      setData(null);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather("Algiers");
  }, []);

  return (
    <div className="weather-card">
      <div className="search-bar">
        <div className="search-bar-content">
          <input
            placeholder="City"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <div
            className="search-btn"
            onClick={() => {
              fetchWeather(input);
            }}
          >
            Search
          </div>
        </div>
      </div>
      <img src={img} height="160" width="160" alt="weather" />
      {loading ? (
        "Loading"
      ) : (
        <React.Fragment>
          {data ? (
            <React.Fragment>
              <div className="city">{data.name}</div>
              <div className="weather-infos">
                <div className="row">
                  <div className="info-title">Temerature</div>
                  <div className="info-title">Weather</div>
                  <div className="info-title">Wind</div>
                </div>
                <div className="row">
                  <div className="info">{`${Math.round(
                    data.main.temp - 273.15
                  )}°`}</div>
                  <div className="info">{data.weather[0].description}</div>
                  <div className="info">{`${data.wind.speed} Km/h`}</div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            "No available Data to Display"
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Weather;
