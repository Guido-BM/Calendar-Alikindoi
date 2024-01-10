const { TodoistApi } = require("@doist/todoist-api-typescript");

const api = new TodoistApi({ authToken: "c5c356739009ab8b9e769aec7bee0585c1df546f" });

api.getProjects()
      .then((projects) => console.log(projects))
      .catch((error) => console.log(error))

api.addProject({ name: "Shopping List" })
      .then((project) => console.log(project))
      .catch((error) => console.log(error))

api.addTask({ content: "Buy Milk", projectId: "2203306141" })
      .then((task) => console.log(task))
      .catch((error) => console.log(error))

api.updateTask("2995104339", { dueString: "tomorrow" })
      .then((isSuccess) => console.log(isSuccess))
      .catch((error) => console.log(error))

api.closeTask("2995104339")
      .then((isSuccess) => console.log(isSuccess))
      .catch((error) => console.log(error))

api.deleteProject("2203306141")
      .then((isSuccess) => console.log(isSuccess))
      .catch((error) => console.log(error))

module.exports = api;
