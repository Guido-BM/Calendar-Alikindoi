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
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import "./Todoist.css";

const Todoist = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const { actions } = useContext(Context);
  const tokenTodoist = localStorage.getItem("tokenTodoist");

  useEffect(() => {
    getTasks()
      .then((task) => {
        console.log(task);
        setTasks(task);
      })
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    const taskToAdd = { content: newTask };
    addTask(taskToAdd)
      .then((addedTask) => {
        if (addedTask && addedTask.id) {
          setTasks((prevTasks) => [...prevTasks, addedTask]);
        } else {
          // handle the case where addedTask is undefined or doesn't have an id
        }
      })
      .catch((error) => {
        // handle the error
      });
    setNewTask("");
    setModalOpen(false);
  };

  if (tokenTodoist) {
    return (
      <div className="subgrid-two-item grid-common grid-c3">
        <div className="grid-c-title">
          <h3 className="text text-silver-v1">TODOIST</h3>
        </div>
        <div className="grid-c3">
          <h4>Tasks:</h4>
          {tasks && tasks.map((task) => (
            <p key={task.id}>{task.content}</p>
          ))}
        </div>
        <TaskModal
          className="TaskModal"
          handleInputChange={handleInputChange}
          handleAddTask={handleAddTask}
        />
      </div>
    );
  } else {
    return (
      // <a
      //   href="http://localhost:3001/api/todoist/auth"
      //   onClick={() => {
      //     const token = actions.getToken(); // Usa el método getToken de las acciones del contexto
      //     localStorage.setItem("tokenJwt", token);
      //   }}
      // >
      //   Log In TODOIST
      // </a>
      <div className="subgrid-two-item grid-common grid-c3">
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
