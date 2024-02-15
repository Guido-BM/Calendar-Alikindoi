import { TodoistApi } from "@doist/todoist-api-typescript";
import React, { useEffect, useRef, useContext } from "react";
import { Context } from "../../store/appContext.js";
import { message } from "antd";

const useTodoistService = () => {
  const todoistApi = useRef();
  const { actions, store } = useContext(Context);

  useEffect(() => {
    todoistApi.current = new TodoistApi(store.tokenTodoist);
  }, [store.tokenTodoist]);

  return {
    getTasks: async () => {
      try {
        const tasks = await todoistApi.current.getTasks();
        return tasks;
      } catch (error) {
        if (store.tokenTodoist) {
          message.info("Loading tasks...");
        }
      }
    },

    closeTask: async (task) => {
      try {
        const response = await todoistApi.current.closeTask(task);
        message.success("Task closed successfully");
        return response;
      } catch (error) {
        console.error("Error closing task:", error);
        throw new Error(
          "Failed to close task. Please check your input and try again."
        );
      }
    },

    addTask: async (task) => {
      try {
        const response = await todoistApi.current.addTask(task);
        message.success("Task added successfully");
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
