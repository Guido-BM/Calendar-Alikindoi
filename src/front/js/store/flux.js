import moment from "moment";
import { get_weather_coordinates } from "./WeatherApi";


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      selectedDate: moment(),
      selectedEvents: [],
      savedMonthlyEvents: [],
      token: "",
      tokenTodoist: "",
      // other state variables...
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],

    },
    message: null,
    demo: [
      {
        title: "FIRST",
        background: "white",
        initial: "white",
      },
      {
        title: "SECOND",
        background: "white",
        initial: "white",
      },
    ],

    actions: {
      // Use getActions to call a function within a fuction
      setSelectedDate: (date) => {
        setStore({ selectedDate: date });
      },
      setSelectedEvents: (events) => {
        setStore({ selectedEvents: events });
      },
      setSavedMonthlyEvents: (events) => {
        setStore({ savedMonthlyEvents: events });
      },
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      setToken: async (email, password) => {
        const store = getStore();
        const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        if (data.token) {
          setStore({ ...store, token: data.token });
          console.log("User is authenticated");
        } else {
          setStore({ ...store, token: "" });
          console.log("User is not authenticated");
        }
      },
      updateToken: (token) => {
        const store = getStore();
        setStore({ ...store, token: token });
      },
      clearToken: () => {
        const store = getStore();
        setStore({ ...store, token: "" });
      },
      getToken: () => {
        const store = getStore();
        return store.token;
      },
      setTokenTodoist: async (code) => {
        const store = getStore();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/todoist`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code: code }),
            }
          );
          const data = await response.json();
          if (data.access_token) {
            setStore({ ...store, tokenTodoist: data.access_token });
            console.log("User is authenticated");
          } else {
            setStore({ ...store, tokenTodoist: "" });
            console.log("User is not authenticated");
          }
        } catch (error) {
          console.error("Error during authentication", error);
          setStore({ ...store, tokenTodoist: "" });
        }
      },
      getWeatherByCoordinates: async (latitude, longitude) => {
        const store = getStore();
        try {
          const weatherData = await get_weather_coordinates(latitude, longitude);
          setStore({ ...store, weather: weatherData });
        } catch (error) {
          console.error("Error obteniendo el tiempo actual:", error);
        }
      },
      getWeatherByCity: async (city) => {
        const store = getStore();
        try {
          const weatherData = await get_weather_city(city);
          setStore({ ...store, weather: weatherData });
        } catch (error) {
          console.error("Error obteniendo el tiempo por ciudad:", error);
        }
      },
    },
  };
};

export default getState;
