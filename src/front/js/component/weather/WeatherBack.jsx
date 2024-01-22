import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import WeatherIcons from "./WeatherIcons";
import "./Weather.css";

export const WeatherBack = () => {
  const { store, actions } = useContext(Context);
  const [city, setCity] = useState("");

  const handleSearch = async () => {
    if (city.trim() !== "") {
      try {
        await actions.getWeatherByCity(city);
      } catch (error) {
        console.error("Error obteniendo el tiempo:", error);
        // Maneja el caso en que no se encuentra la ciudad
      }
    }
  };

  return (
    <div className="weather-panel">
      <div className="weather-search">
        <input
          type="text"
          placeholder="Ingrese el nombre de la ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {store.weather && (
        <div className="weather-today">
          <div className="weather-city">
            <h2>
              {store.weather.name}
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
              {WeatherIcons(store.weather.weather[0].description)}
            </div>
          </div>

          <div className="temperature-info">
            <span>{store.weather.main.temp.toFixed(0)}ºC</span>
            <br />
            <small>
              {store.weather.main.temp_min}ºC/{store.weather.main.temp_max}ºC
            </small>
          </div>
        </div>
      )}

      {/* Agrega cualquier otra información que desees mostrar */}
    </div>
  );
};
