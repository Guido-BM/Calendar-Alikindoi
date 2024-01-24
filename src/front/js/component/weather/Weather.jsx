import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import WeatherIcons from "./WeatherIcons";

import "./Weather.css";

export const Weather = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          actions.getWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.error("La geolocalización no está soportada por este navegador.");
    }
  }, []);

  return (
    <div className="weather-panel">
      <div className="weather-city weather-today">
        <h2 className="principal">{store.weather?.name}</h2>
        {/* <small>
              {new Date().toLocaleDateString("es-es", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </small> */}
        <div className="weather-icon">
          {WeatherIcons(store.weather?.weather[0]?.description)}
          <p>{store.weather?.weather[0]?.description}</p>
        </div>
      </div>

      <div className="temperature-info">
        <span className="degrees">{store.weather?.main.temp.toFixed(0)}ºC</span>
        <br />
        <span className="temp_range">
          {store.weather?.main?.temp_min.toFixed(0)}ºC/
          {store.weather?.main?.temp_max.toFixed(0)}ºC
        </span>
      </div>
    </div>
  );
};
