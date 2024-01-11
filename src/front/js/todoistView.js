import React, { useState, useEffect } from 'react';
import { TodoistApi } from "../../TEST/js/todo.js";
import createApi from '../../TEST/js/todo.js';

export const TodoistView = () => {
      const [tasks, setTasks] = useState([]);

      useEffect(() => {
            // Obtén el 'access_token' del usuario de alguna manera (por ejemplo, de tu base de datos)
            const access_token = getUserAccessToken();

            // Crea una nueva instancia de 'api' con el 'access_token' del usuario
            const api = createApi(access_token);

            api.getTasks()
                  .then(fetchedTasks => setTasks(fetchedTasks))
                  .catch(error => console.error('Error:', error));
      }, []);

      return (
            <ul>
                  {tasks.map(task => <li key={task.id}>{task.content}</li>)}
            </ul>
      );
}
