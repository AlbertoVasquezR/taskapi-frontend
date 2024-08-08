import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskItem.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importa los íconos

const TaskItem = ({ task, onDelete }) => {
    const handleDelete = async () => {
      if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
        await axios.delete(`https://localhost:7078/api/tasks/${task.id}`);
        onDelete(task.id);
      }
    };
  
    return (
      <div className="task-item">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Completada: {task.isCompleted ? 'Sí' : 'No'}</p>
        <p>Fecha de Creación: {new Date(task.createdAt).toLocaleDateString()}</p>
        <div>
          <Link to={`/edit/${task.id}`}>
            <button>
              <FaEdit /> Editar
            </button>
          </Link>
          <button onClick={handleDelete}>
            <FaTrash /> Eliminar
          </button>
        </div>
      </div>
    );
  };
  
  export default TaskItem;

