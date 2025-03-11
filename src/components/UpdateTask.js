import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskForm.css'; // Reusing TaskForm CSS for consistent styling

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'Medium',
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/tasks/${id}/`)
      .then((response) => response.json())
      .then((data) => setTask(data))
      .catch((error) => console.error('Error fetching task:', error));
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error('Failed to update task');
      alert('Task updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />

        <label htmlFor="due_date">Due Date:</label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          required
        />

        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div className="button-group">
          <button type="submit">Update Task</button>
          <button type="button" className="back-button" onClick={() => navigate('/')}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
