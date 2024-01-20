const API_TOKEN = '16154dbb027b470b05feb3637f0e6a96'
const weather_api_url = 'https://api.openweathermap.org/data/2.5/weather?'
// const forecast_api_url = 'https://api.openweathermap.org/data/2.5/forecast?'

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export const get_weather_city = async (city) => {
  const request = await fetch(`${weather_api_url}q=${city}&lang=es&units=metric&appid=${API_TOKEN}`);
  const data = await request.json();
  return await data
}

// export const get_forecast = async (city) => {
//   const request = await fetch(`${forecast_api_url}q=${city}&lang=es&units=metri&appid=${API_TOKEN}`);
//   const data = await request.json();
//   return await data
// }