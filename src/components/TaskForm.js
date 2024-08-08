import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheck, FaPlus } from 'react-icons/fa'; // Importa íconos

import './TaskForm.css'; 

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`https://localhost:7078/api/tasks/${id}`);
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setIsCompleted(task.isCompleted);
          setCreatedAt(task.createdAt);
        } catch (error) {
          console.error("Error fetching task:", error);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      id,
      title,
      description,
      isCompleted,
      createdAt: id ? createdAt : new Date(),
    };

    try {
      if (id) {
        await axios.put(`https://localhost:7078/api/tasks/${id}`, task);
      } else {
        await axios.post('https://localhost:7078/api/tasks', task);
      }
      navigate('/');
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="task-form">
      <h1>{id ? "Editar Tarea" : "Crear Nueva Tarea"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </label>
        <label>
          Descripción:
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </label>
        <label>
          Completada:
          <input 
            type="checkbox" 
            checked={isCompleted} 
            onChange={(e) => setIsCompleted(e.target.checked)} 
          />
        </label>
        <button type="submit">
          {id ? <FaCheck /> : <FaPlus />} {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
