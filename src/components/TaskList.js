import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Importa el ícono

import './TaskList.css'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://localhost:7078/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-list">
      <h1>Lista de Tareas</h1>
      <Link to="/new">
        <button>
          <FaPlus /> Crear Nueva Tarea
        </button>
      </Link>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskList;

