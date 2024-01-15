// const { TodoistApi } = require("@doist/todoist-api-typescript");

// // La función 'createApi' acepta un 'access_token' como parámetro
// function createApi(access_token) {
//   // Crea una nueva instancia de 'TodoistApi' con el 'access_token' proporcionado
//   const api = new TodoistApi({ authToken: access_token });

//   // Devuelve la instancia de 'api'
//   return api;
// }
// const api = createApi("0b41420452dd60a56a6dacb4d37f4d259fcd8587");
// api
//   .getProjects()
//   .then((projects) => console.log(projects))
//   .catch((error) => console.log(error));

// api
//   .addProject({ name: "Shopping List" })
//   .then((project) => console.log(project))
//   .catch((error) => console.log(error));

// api
//   .addTask({ content: "Buy Milk", projectId: "2203306141" })
//   .then((task) => console.log(task))
//   .catch((error) => console.log(error));

// api
//   .updateTask("2995104339", { dueString: "tomorrow" })
//   .then((isSuccess) => console.log(isSuccess))
//   .catch((error) => console.log(error));

// api
//   .closeTask("2995104339")
//   .then((isSuccess) => console.log(isSuccess))
//   .catch((error) => console.log(error));

// api
//   .deleteProject("2203306141")
//   .then((isSuccess) => console.log(isSuccess))
//   .catch((error) => console.log(error));

// module.exports = createApi;
