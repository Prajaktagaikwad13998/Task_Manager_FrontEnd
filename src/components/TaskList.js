import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskList.css'; // Ensure to link your new CSS

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/tasks/')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container">
      <h1>Task List</h1>
      <div className="add-task">
        <button onClick={() => navigate('/add')}>Add Task</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.due_date}</td>
              <td>{task.priority}</td>
              <td className="action-buttons">
                <button onClick={() => handleEdit(task.id)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
