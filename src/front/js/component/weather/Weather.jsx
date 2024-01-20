import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "./Weather.css";

export const Weather = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getWeatherCity("Palencia");
    // actions.getForecast("Palencia");
  }, []);

  return (
    <div className="weather-panel">
      <div className="weather-today">
        <div className="weather-city">
          <h2>
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
          <p className="weather-description">
            {/* <img className='weather-icon' src={WeatherIcons(icon)} alt="icon-weather" /> */}
            <i className="weather-icon">
              {store.weather?.weather[0]?.description}
            </i>
          </p>
        </div>

        <div className="temperature-info">
          <span>{store.weather?.main.temp.toFixed(0)}ºC</span>
          <br />
          <small>
            {store.weather?.main?.temp_min}ºC/{store.weather?.main?.temp_max}ºC
          </small>
        </div>
      </div>

      <div className="forecast-info">
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
      </div>
    </div>
  );
};
