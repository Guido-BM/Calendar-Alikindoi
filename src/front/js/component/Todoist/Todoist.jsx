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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import useTodoistService from "./useTodoistService.jsx";

const Todoist = ({ taskToEdit }) => {
  const [tasks, setTasks] = useState([]);
  const { actions, store } = useContext(Context);
  const tokenTodoist = localStorage.getItem("tokenTodoist");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { getTasks } = useTodoistService();

  const markTaskComplete = async (taskId) => {
    if (typeof taskId !== "string") {
      console.error("Invalid taskId: ", taskId);
      return;
    }
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      console.error("Task not found: ", taskId);
      return;
    }
    task.isCompleted = true;
    setTasks(tasks.map((t) => (t.id === taskId ? task : t)));
    try {
      const isSuccess = await closeTask(taskId);
      console.log(isSuccess);
      if (isSuccess) {
        const updatedTasks = await getTasks();
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Failed to close task: ", error);
    }
  };

  const startEditing = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const taskToUpdate = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleClose = () => {
    setSelectedTask(null);
    setIsEditing(false);
  };

  const isModalOpen = () => {
    setIsEditing(true);
  };

  const setIsModalOpen = () => {
    setIsEditing(false);
  };

  const stopEditing = () => {
    setSelectedTask(null);
    setIsEditing(false);
  };

  const addNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditClick = (event, task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const showDescription = (event, task) => {
    event.stopPropagation();
    setSelectedTask(task);
  };

  useEffect(() => {
    console.log("component tokenTodoist", tokenTodoist);
    getTasks().then((tasks) => {
      setTasks(tasks);
    });
  }, [store.tokenTodoist]);

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedTask(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  let sortedTasks;
  if (tasks) {
    sortedTasks = tasks.sort((a, b) => b.priority - a.priority);
  }

  if (tokenTodoist) {
    return (
      <div className="todoist-container subgrid-two-item grid-common grid-c3">
        <div className="title-container">
          <h3 className="title-todoist">TODOIST</h3>
        </div>
        <div className="grid-c3">
          <div className="inbox-container">
            <h4 className="inbox-title">Inbox</h4>
            <FontAwesomeIcon
              icon={faSyncAlt}
              className="refresh-icon"
              onClick={() =>
                getTasks().then((tasks) => {
                  setTasks(tasks);
                })
              }
            />
          </div>
          {sortedTasks &&
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`task-container priority-${task.priority}`}
                onClick={(event) => showDescription(event, task)}
              >
                <input
                  type="radio"
                  id={`task-${task.id}`}
                  className={`priority-${task.priority}`}
                  checked={task.isCompleted}
                  onChange={() => markTaskComplete(task.id)}
                />
                <label htmlFor={`task-${task.id}`}></label>
                {task.content}
                <TaskModalEdit
                  taskToUpdate={taskToUpdate}
                  onClose={handleClose}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
                {selectedTask && selectedTask.id === task.id && (
                  <div className="task-details">
                    <div className="task-description">
                      {selectedTask.description}
                    </div>
                    <div className="task-due-date">{selectedTask.dueDate}</div>
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
            (window.location.href =
              "https://sample-service-name-gn1r.onrender.com/api/todoist/auth")
          }
        >
          LogIn TODOIST
        </Button>
      </div>
    );
  }
};

export default Todoist;
