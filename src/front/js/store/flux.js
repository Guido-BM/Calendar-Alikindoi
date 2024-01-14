import moment from "moment";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      selectedDate: moment(),
      selectedEvents: [],
      savedMonthlyEvents: [],
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
      token: "",
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
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();
        setStore({ ...store, token: data.token });
      },
      clearToken: () => {
        const store = getStore();
        setStore({ ...store, token: "" });
      },
    },
  };
};

export default getState;
