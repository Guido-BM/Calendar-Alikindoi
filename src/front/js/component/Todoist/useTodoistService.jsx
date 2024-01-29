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
      await todoistApi.current
        .getTasks()
        .catch((error) => console.error(error)),

    addTask: async (task) => {
      try {
        const response = await todoistApi.current.addTask(task);
        return response;
      } catch (error) {
        console.error("Error adding task:", error);
        throw new Error(
          "Failed to add task. Please check your input and try again."
        );
      }
    },
  };
};

export default useTodoistService;
