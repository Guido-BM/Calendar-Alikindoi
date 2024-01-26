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
import TaskModalEdit from "./TaskModalEdit.jsx";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import "./Todoist.css";
import { Button } from "antd";

const Todoist = () => {
  const [tasks, setTasks] = useState([]);
  const { actions } = useContext(Context);
  const tokenTodoist = localStorage.getItem("tokenTodoist");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const markTaskComplete = async (taskId) => {
    if (typeof taskId !== 'string') {
      console.error('Invalid taskId: ', taskId);
      return;
    }
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      console.error('Task not found: ', taskId);
      return;
    }
    task.isCompleted = true;
    setTasks(tasks.map(t => t.id === taskId ? task : t));
    try {
      const isSuccess = await closeTask(taskId);
      console.log(isSuccess);
      if (isSuccess) {
        const updatedTasks = await getTasks();
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error('Failed to close task: ', error);
    }
  };
  const startEditing = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const stopEditing = () => {
    setSelectedTask(null);
    setIsEditing(false);
  };
  const addNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const handleEditClick = (task) => {
    setSelectedTask(task);
  };

  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  if (tokenTodoist) {
    return (
      <div className="todoist-container subgrid-two-item grid-common grid-c3">
        <div className="grid-c-title">
          <h3 className="title-todoist">TODOIST</h3>
        </div>
        <div className="grid-c3">
          <h4>Inbox</h4>
          {tasks.map((task) => (
            <div key={task.id} className="task-container">
              <input
                type="radio"
                checked={task.isCompleted}
                onChange={() => markTaskComplete(task.id)}
              />
              <div onClick={() => startEditing(task)} title={task.description}>
                {task.content}
              </div>
              {selectedTask && selectedTask.id === task.id && (
                <div className="task-description">
                  {selectedTask.description}
                </div>
              )}
            </div>
          ))}
          {isEditing && (
            <TaskModalEdit
              taskToUpdate={selectedTask}
              onClose={() => stopEditing()}
            />
          )}
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
        <Button
          type="primary"
          property="loading"
          onClick={() =>
            (window.location.href = "http://localhost:3001/api/todoist/auth")
          }
        >
          LogIn TODOIST
        </Button>
      </div>
    );
  }
};

export default Todoist;
