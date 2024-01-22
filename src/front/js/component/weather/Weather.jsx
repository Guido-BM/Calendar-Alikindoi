import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import WeatherIcons from "./WeatherIcons";

import "./Weather.css";

export const Weather = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Obtener la ubicación del usuario usando la API de geolocalización del navegador
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
      <div className="weather-today">
        <div className="weather-city">
          <h2 className="principal">
            {store.weather?.name}
            <br />
            <small>
              {new Date().toLocaleDateString("es-es", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </small>
          </h2>
          <div className="weather-icon">
            {WeatherIcons(store.weather?.weather[0]?.description)}
            <p>{store.weather?.weather[0]?.description}</p>
          </div>
        </div>

        <div className="temperature-info">
          <span className="degrees">{store.weather?.main.temp.toFixed(0)}ºC</span>
          <br />
          <span className="temp_range">
            {store.weather?.main?.temp_min}ºC/{store.weather?.main?.temp_max}ºC
          </span>
        </div>
      </div>

      {/* <div className="forecast-info">
        <div className="1">
          <p>{store.weather?.main?.humidity}</p>
          <p>Imagen/descrip</p>
          <p>temperatura</p>
        </div>
        <div className="2">
          <p>{store.weather?.wind?.speed}</p>
          <p>Imagen/descrip</p>
          <p>temperatura</p>
        </div>
      </div> */}
    </div>
  );
};
