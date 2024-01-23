import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import WeatherIcons from "./WeatherIcons";
import "./Weather.css";


export const WeatherBack = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState('');
  // const [values, setValues] = useState('');

  const handleSearch = (e) => {
    if(e.key === 'Enter'){      
      actions.getWeatherByCity(search)
    }
  }
  useEffect(() => {
    
  }, []);

  return (
    <div className="weather-panel">
      <div className="weather-today">
        <div className="weather-city">
          <h2 className="principal">
            {store.weatherBack?.name}
          </h2>
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
          <input
            className="weather-input"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={handleSearch}
            type="text"
            placeholder="Introduce la ciudad "
          />
          
          <span className="degrees">{store.weatherBack?.main.temp.toFixed(0)}ºC</span>
          
          <span className="temp_range">
            {store.weatherBack?.main?.temp_min.toFixed(0)}ºC/{store.weatherBack?.main?.temp_max.toFixed(0)}ºC
          </span>
          
        </div>
      </div>
    </div>
  );
};


