import React, { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  closeTask,
  getProjects,
} from "../../store/todoistService";
import TaskModal from "./TaskModal.jsx";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Financial = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTasks().then((task) => setTasks(task));
    getProjects().then((project) => setProjects(project));
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

  return (
    <div className="subgrid-two-item grid-common grid-c8">
      <div className="grid-c-title">
        <h3 className="text text-silver-v1">TODOIST</h3>
      </div>
      <div
        className="grid-c8-content"
        style={{ overflowY: "auto", maxHeight: "90px" }}
      >
        <h4>Tasks:</h4>
        {tasks.map((task) => (
          <p key={task.id}>{task.content}</p>
        ))}
        <h4>Projects:</h4>
        {projects.map((project) => (
          <p key={project.id}>{project.name}</p>
        ))}
      </div>
      <TaskModal
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
      />
      {/* <Button type="primary" onClick={handleClick}>
        Log In TODOIST
      </Button> */}
      {/* <Link to="/privacy-policy">Privacy Policy</Link> */}
      <a href="http://localhost:3001/api/todoist/auth">Log In TODOIST</a>
    </div>
  );
};

export default Financial;
