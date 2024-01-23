import React, { useEffect, useState, useContext } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  closeTask,
  getProjects,
} from "../../store/todoistService.js";
import TaskModal from "./TaskModal.jsx";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import "./Todoist.css";
import { Button } from "antd";

const Todoist = () => {
  const [tasks, setTasks] = useState([]);
  const { actions } = useContext(Context);
  const tokenTodoist = localStorage.getItem("tokenTodoist");
  const addNewTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  useEffect(() => {
    getTasks()
      .then((task) => {
        console.log(task);
        setTasks(task);
      })
      .catch(error => console.error(error));
  }, []);

  if (tokenTodoist) {
    return (
      <div className="todoist-container subgrid-two-item grid-common grid-c3">
        <div className="grid-c-title">
          <h3 className="text text-silver-v1">TODOIST</h3>
        </div>
        <div className="grid-c3">
          <h4>Tasks:</h4>
          {tasks && tasks.map((task) => (
            <p key={task.id}>{task.content}</p>
          ))}
        </div>
        <TaskModal addNewTask={addNewTask} />
      </div>
    );
  } else {
    return (
      <div className="todoist-container subgrid-two-item grid-common grid-c3">
        <div className="grid-c-title">
          <h3 className="text text-silver-v1">TODOIST</h3>
        </div>
        <Button type="primary"
          property="loading"
          onClick={() => window.location.href = "http://localhost:3001/api/todoist/auth"}
        >LogIn TODOIST</Button>
      </div>
    )
  };
};

export default Todoist;
