const API_TOKEN = "16154dbb027b470b05feb3637f0e6a96";
const weather_api_url = "https://api.openweathermap.org/data/2.5/weather?";

// const API_TOKEN_2 = '40066348681a46cd860193834242101'
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export const get_weather_coordinates = async (latitude, longitude) => {
  const request = await fetch(
    `${weather_api_url}lat=${latitude}&lon=${longitude}&units=metric&appid=${API_TOKEN}`
  );
  const data = await request.json();
  return data;
};
