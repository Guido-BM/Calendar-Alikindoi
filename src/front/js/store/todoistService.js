import { TodoistApi } from "@doist/todoist-api-typescript";

const TOKEN = localStorage.getItem('tokenTodoist');

const api = new TodoistApi(TOKEN);

// Tasks
export const getTasks = () => {
  return api.getTasks().catch((error) => console.error(error));
};

export const addTask = (task) => {
  try {
    const response = api.addTask(task);
    return response;
  } catch (error) {
    console.error('Error adding task:', error);
    throw new Error('Failed to add task. Please check your input and try again.');
  }
};

export const updateTask = (id, content) => {
  return api.updateTask(id, content).catch((error) => console.error(error));
};

export const deleteTask = (id) => {
  return api.deleteTask(id).catch((error) => console.error(error));
};

export const closeTask = (id) => {
  return api.closeTask(id).catch((error) => console.error(error));
};

export const reopenTask = (id) => {
  return api.reopenTask(id).catch((error) => console.error(error));
};

export const completeTask = (id) => {
  return api.completeTask(id).catch((error) => console.error(error));
};

export const uncompleteTask = (id) => {
  return api.uncompleteTask(id).catch((error) => console.error(error));
};

// Projects
export const getProjects = () => {
  return api.getProjects().catch((error) => console.error(error));
};

export const addProject = (name) => {
  return api.addProject(name).catch((error) => console.error(error));
};

export const updateProject = (id, name) => {
  return api.updateProject(id, name).catch((error) => console.error(error));
};

export const deleteProject = (id) => {
  return api.deleteProject(id).catch((error) => console.error(error));
};

// Labels
export const getLabels = () => {
  return api.getLabels().catch((error) => console.error(error));
};

export const addLabel = (name) => {
  return api.addLabel(name).catch((error) => console.error(error));
};

export const updateLabel = (id, name) => {
  return api.updateLabel(id, name).catch((error) => console.error(error));
};

export const deleteLabel = (id) => {
  return api.deleteLabel(id).catch((error) => console.error(error));
};

// Comments
export const getComments = () => {
  return api.getComments().catch((error) => console.error(error));
};

export const addComment = (content) => {
  return api.addComment(content).catch((error) => console.error(error));
};

export const updateComment = (id, content) => {
  return api.updateComment(id, content).catch((error) => console.error(error));
};

export const deleteComment = (id) => {
  return api.deleteComment(id).catch((error) => console.error(error));
};

// Sections
export const getSections = () => {
  return api.getSections().catch((error) => console.error(error));
};

export const addSection = (name) => {
  return api.addSection(name).catch((error) => console.error(error));
};

export const updateSection = (id, name) => {
  return api.updateSection(id, name).catch((error) => console.error(error));
};

export const deleteSection = (id) => {
  return api.deleteSection(id).catch((error) => console.error(error));
};

// Reminders
export const getReminders = () => {
  return api.getReminders().catch((error) => console.error(error));
};

export const addReminder = (task_id, due_date) => {
  return api
    .addReminder(task_id, due_date)
    .catch((error) => console.error(error));
};

export const updateReminder = (id, task_id, due_date) => {
  return api
    .updateReminder(id, task_id, due_date)
    .catch((error) => console.error(error));
};

export const deleteReminder = (id) => {
  return api.deleteReminder(id).catch((error) => console.error(error));
};
