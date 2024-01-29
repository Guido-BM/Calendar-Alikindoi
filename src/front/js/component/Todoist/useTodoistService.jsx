import { TodoistApi } from "@doist/todoist-api-typescript";
import React, { useEffect, useRef, useContext } from "react";
import { Context } from "../../store/appContext.js";

const useTodoistService = () => {
  const todoistApi = useRef();
  const { actions, store } = useContext(Context);

  useEffect(() => {
    todoistApi.current = new TodoistApi(store.tokenTodoist);
  }, [store.tokenTodoist]);

  return {
    getTasks: async () =>
      todoistApi.current.getTasks().catch((error) => console.error(error)),
  };
};

export default useTodoistService;
