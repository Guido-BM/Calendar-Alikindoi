require('dotenv').config();
const { TodoistApi } = require('@doist/todoist-api-typescript');

const api = new TodoistApi(process.env.API_KEY);

async function getUserProjects() {
      try {
            const projects = await api.getProjects();
            return projects;
      } catch (error) {
            console.error('error', error);
      }
}

async function getTasks(projectId) {
      try {
            const tasks = await api.getTasks({ projectId });
            return tasks;
      } catch (error) {
            console.error('error', error);
      }
}

async function createTask(projectId, taskContent) {
      try {
            const newTask = await api.addTask({
                  content: taskContent, projectId
            })
            return newTask;
      } catch (error) {
            console.error('error', error);
      }
}

async function markTaskAsCompleted(taskId) {
      try {
            const taskCompleted = await api.closeTask(taskId);
            return taskCompleted;
      } catch (error) {
            console.error('error', error);
      }
}

(async () => {
      const projects = await getUserProjects();
      console.log(projects);

      const newTask = await createTask(projects[0].id, "Record video");
      console.log(newTask);

      const tasks = await getTasks(projects[0].id);
      console.log(tasks);

      const completedTask = await markTaskAsCompleted(newTask.id);
      console.log(completedTask);

      const tasksAfterComplete = await getTasks(projects[0].id);
      console.log(tasksAfterComplete)

})()
