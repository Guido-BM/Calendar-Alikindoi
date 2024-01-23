import React from 'react';

const WeatherIcons = (description) => {
  
  let iconComponent;

  if (description === 'thunderstorm') {
    iconComponent = <img src={require('../../assets/weatherIcons/thunderstorm.png').default} alt="Thunderstorm" />;

  } else if (description === 'snow') {
    iconComponent = <img src={require('../../assets/weatherIcons/snow.png').default} alt="snow" />;

  } else if (description === 'shower rain') {
    iconComponent = <img src={require('../../assets/weatherIcons/shower rain.png').default} alt="shower rain" />;

  } else if (description === 'scattered clouds') {
    iconComponent = <img src={require('../../assets/weatherIcons/scattered clouds.png').default} alt="scattered clouds" />;

  } else if (description === 'rain') {
    iconComponent = <img src={require('../../assets/weatherIcons/rain.png').default} alt="rain" />;

  } else if (description === 'mist') {
    iconComponent = <img src={require('../../assets/weatherIcons/mist.png').default} alt="mist" />;

  } else if (description === 'few clouds') {
    iconComponent = <img src={require('../../assets/weatherIcons/few clouds.png').default} alt="few clouds" />;

  } else if (description === 'clear sky') {
    iconComponent = <img src={require('../../assets/weatherIcons/clear sky.png').default} alt="clear sky" />;

  } else if (description === 'broken clouds') {
    iconComponent = <img src={require('../../assets/weatherIcons/broken clouds.png').default} alt="broken clouds" />;
  } else {
    // Imagen por defecto si no hay coincidencia
    iconComponent = <img src={require('../../assets/weatherIcons/defecto.png').default} alt="defecto" />;
  }

  return iconComponent;
};

export default WeatherIcons;

