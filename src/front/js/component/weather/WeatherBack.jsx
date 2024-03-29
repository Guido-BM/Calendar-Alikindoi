import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import WeatherIcons from "./WeatherIcons";
import "./WeatherBack.css";
import { message } from "antd";

export const WeatherBack = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const result = await actions.getWeatherByCity(search);
      if (!result) {
        message.error(`City '${search}' not found`);
      }
      setSearch("");
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
    <div className="weather-panel-back">
      <div className="weather-city-back ">
        <h2 className="principal-back">{store.weatherBack?.name}</h2>
        <div className="weather-icon-back">
          {WeatherIcons(store.weatherBack?.weather[0]?.description)}
          <p className="description-back">{store.weatherBack?.weather[0]?.description}</p>
        </div>
      </div>
      <div className="temperature-info-back">
        <div className="ghost-container">
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
            </div>
            <div className="torso"></div>
            <div className="hands">
              <div className="hands-l"></div>
              <div className="hands-r"></div>
            </div>
            <div className="legs"></div>
          </div>
        </div>
        <span className="degrees-back">
          {store.weatherBack?.main.temp.toFixed(0)}ºC
        </span>
        <span className="temp_range-back">
          {store.weatherBack?.main?.temp_min.toFixed(0)}ºC/
          {store.weatherBack?.main?.temp_max.toFixed(0)}ºC
        </span>
      </div>
    </div>
  );
};




