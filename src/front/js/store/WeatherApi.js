const API_TOKEN = "16154dbb027b470b05feb3637f0e6a96";
const weather_api_url = "https://api.openweathermap.org/data/2.5/weather?";

// const API_TOKEN_2 = '40066348681a46cd860193834242101'
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export const get_weather_city = async (city) => {
  const request = await fetch(
    `${weather_api_url}q=${city}&units=metric&appid=${API_TOKEN}`
  );
  const data = await request.json();
  return await data;
};
