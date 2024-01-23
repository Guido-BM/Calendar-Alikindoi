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
  const [projects, setProjects] = useState([]);
  const addNewTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const getTasksForProject = (project_id) => {
    return getTasks()
      .then((tasks) => tasks.filter(task => task.project_id === project_id))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProjects()
      .then((projects) => {
        setProjects(projects);
        // Para cada proyecto, obtener sus tareas
        projects.forEach((project) => {
          getTasksForProject(project.id)
            .then((tasks) => {
              // Agregar las tareas al proyecto
              project.tasks = tasks;
              // Actualizar el estado de los proyectos
              setProjects(prevProjects => prevProjects.map(p => p.id === project.id ? project : p));
            })
            .catch(error => console.error(error));
        });
      })
      .catch(error => console.error(error));
  }, []);

  if (tokenTodoist) {
    return (
      <div className="todoist-container subgrid-two-item grid-common grid-c3">
        <div className="grid-c-title">
          <h3 className="title-todoist">TODOIST</h3>
        </div>
        <div className="grid-c3">
          {projects && projects.map((project) => (
            <div key={project.id}>
              <h4>{project.name}</h4>
              {project.tasks && project.tasks.map((task) => (
                <p key={task.id}>{task.content}</p>
              ))}
            </div>
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
