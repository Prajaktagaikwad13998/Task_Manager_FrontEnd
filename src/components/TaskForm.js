import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskForm.css'; // Ensure this is linked to the correct CSS file

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'Medium',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error('Failed to add task');
      alert('Task added successfully!');
      setTask({ title: '', description: '', due_date: '', priority: 'Medium' }); // Reset form
      navigate('/'); // Redirect to task list after submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Task</h2>
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
          <button type="submit">Add Task</button>
          <button type="button" className="back-button" onClick={() => navigate('/')}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
