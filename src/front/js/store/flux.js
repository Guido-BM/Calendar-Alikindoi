import moment from "moment";
import { get_weather_coordinates, get_weather_city } from "./WeatherApi";
import { set } from "immutable";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      selectedDate: moment(),
      selectedEvents: [],
      savedMonthlyEvents: [],
      token: "",
      tokenTodoist: "",
      user: null,
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
        const store = getStore();
        setStore({ ...store, selectedDate: date });
      },
      setSelectedEvents: (events) => {
        const store = getStore();
        setStore({ ...store, selectedEvents: events });
      },
      setSavedMonthlyEvents: (events) => {
        const store = getStore();
        setStore({ ...store, savedMonthlyEvents: events });
      },
      saveEvent: async (event) => {
        const store = getStore();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/users/${store.user}/events`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
              },
              body: JSON.stringify(event),
            }
          );
          console.log(event);
          const data = await response.json();
          if (data.id) {
            // El evento se guardó correctamente
            // Puedes agregar el evento a tu store si lo necesitas
            setStore({
              ...store,
              savedMonthlyEvents: [...store.savedMonthlyEvents, data],
            });
          } else {
            // Hubo un error al guardar el evento
            console.error("Error saving event:", data);
          }
        } catch (error) {
          console.error("Error saving event:", error);
        }
      },
      loadUserEvents: async () => {
        const store = getStore();
        if (store.user) {
          try {
            const response = await fetch(
              `${process.env.BACKEND_URL}/api/users/${store.user}/events`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${store.token}`,
                },
              }
            );
            const data = await response.json();
            if (Array.isArray(data)) {
              // Los eventos se cargaron correctamente
              // Puedes agregar los eventos a tu store
              setStore({
                ...store,
                savedMonthlyEvents: data,
              });
            } else {
              // Hubo un error al cargar los eventos
              console.error("Error loading events:", data);
            }
          } catch (error) {
            console.error("Error loading events:", error);
          }
        }
      },
      saveUserEvents: async (events) => {
        const store = getStore();
        // iterate over the events array and save each event
        for (const event of events) {
          try {
            const response = await fetch(
              `${process.env.BACKEND_URL}/api/users/${store.user}/events`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${store.token}`,
                },
                body: JSON.stringify(event),
              }
            );
            const data = await response.json();
            if (data.id) {
              // The event was saved correctly
              // You can add the event to your store if you need to
              setStore({
                ...store,
                savedMonthlyEvents: [...store.savedMonthlyEvents, data],
              });
            } else {
              // There was an error saving the event
              console.error("Error saving event:", data);
            }
          } catch (error) {
            console.error("Error saving event:", error);
          }
        }
      },
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const store = getStore();
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ ...store, message: data.message });
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
        setStore({ ...store, demo: demo });
      },
      setToken: async (email, password) => {
        const store = getStore();
        const responseLogin = await fetch(
          `${process.env.BACKEND_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
          }
        );
        const data = await responseLogin.json();
        if (data.token) {
          setStore({ ...store, token: data.token });
          setStore({ ...store, user: data.user_id });
          await getActions().setTokenFromLocalStorage(data.token);
          localStorage.setItem("tokenJwt", data.token);
          console.log("User is authenticated");
          return data.token;
        } else {
          setStore({ ...store, token: "" });
          console.log("User is not authenticated");
        }
      },
      setTokenFromLocalStorage: async (tokenJwt) => {
        fetch(process.env.BACKEND_URL + "/identify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenJwt}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Aquí puedes manejar la respuesta de tu backend
            // Por ejemplo, podrías guardar el usuario en el store
            setStore({ ...store, user: data.user });
          })
          .catch((error) => {
            // Aquí puedes manejar los errores
            console.error("Error:", error);
          });
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
        setStore({ ...store, tokenTodoist: code });
        // const store = getStore();
        // try {
        //   const response = await fetch(
        //     `${process.env.BACKEND_URL}/api/todoist`,
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({ code: code }),
        //     }
        //   );
        //   const data = await response.json();
        //   if (data.access_token) {
        //     setStore({ ...store, tokenTodoist: data.access_token });
        //     console.log("User is authenticated");
        //   } else {
        //     setStore({ ...store, tokenTodoist: "" });
        //     console.log("User is not authenticated");
        //   }
        // } catch (error) {
        //   console.error("Error during authentication", error);
        //   setStore({ ...store, tokenTodoist: "" });
        // }
      },
      getWeatherByCoordinates: async (latitude, longitude) => {
        const store = getStore();
        try {
          const weatherData = await get_weather_coordinates(
            latitude,
            longitude
          );
          setStore({
            ...store,
            weather: weatherData,
            weatherBack: weatherData,
          });
        } catch (error) {
          console.error("Error obteniendo el tiempo actual:", error);
        }
      },
      getWeatherByCity: async (search) => {
        const store = getStore();
        try {
          const weatherData = await get_weather_city(search);
          setStore({ ...store, weatherBack: weatherData });
        } catch (error) {
          console.error("Error obteniendo el tiempo por ciudad:", error);
        }
      },
    },
  };
};

export default getState;
