import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import WeatherIcons from "./WeatherIcons";
import "./Weather.css";

export const WeatherBack = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");
  // const [values, setValues] = useState('');

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      actions.getWeatherByCity(search);
      setSearch('');
    }
  };
  useEffect(() => {
    let timer;
    let i = 0;
    const mouthElement = document.getElementById("mouth");

    if (!mouthElement) {
      console.error("Elemento $mouth no encontrado.");
      return;
    }

    timer = setInterval(() => {
      mouthElement.classList.toggle("mouth--open");
      if (i === 6) {
        clearInterval(timer);
      }
      i++;
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="weather-panel">
      <div className="weather-today">
        <div className="weather-city">
          <h2 className="principal">{store.weatherBack?.name}</h2>
          <small>
            {new Date().toLocaleDateString("es-es", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </small>
          <div className="weather-icon">
            {WeatherIcons(store.weatherBack?.weather[0]?.description)}
            <p>{store.weatherBack?.weather[0]?.description}</p>
          </div>
        </div>

        <div className="temperature-info">
          <div className="container">
            <div className="chat-buble" id="ghost-buble"></div>
            <input
              id="ghost-input"
              className="weather-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              type="text"
              placeholder="Search city "
            />
            <div className="ghost">
              <div className="face">
                <div className="eyes">
                  <div className="eyes-l"></div>
                  <div className="eyes-r"></div>
                </div>
                {/* <div className="mouth"></div> */}
              </div>
              <div className="torso"></div>
              <div className="hands">
                <div className="hands-l"></div>
                <div className="hands-r"></div>
              </div>
              <div className="legs"></div>
            </div>
          </div>
          
          <span className="degrees">
            {store.weatherBack?.main.temp.toFixed(0)}ºC
          </span>

          <span className="temp_range">
            {store.weatherBack?.main?.temp_min.toFixed(0)}ºC/
            {store.weatherBack?.main?.temp_max.toFixed(0)}ºC
          </span>
        </div>
      </div>
    </div>
  );
};
