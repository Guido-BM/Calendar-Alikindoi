import React, { useState, useEffect } from 'react';
import { TodoistApi } from "../../TEST/js/todo.js";
import api from '../../TEST/js/todo.js';

export const TodoistView = () => {
      const [tasks, setTasks] = useState([]);

      useEffect(() => {
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
