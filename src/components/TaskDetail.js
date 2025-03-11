// src/components/TaskDetail.js
import React from 'react';

const TaskDetail = ({ task }) => {
  if (!task) return <p>Select a task to view details</p>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {task.due_date}</p>
      <p>Priority: {task.priority}</p>
    </div>
  );
};

export default TaskDetail;
