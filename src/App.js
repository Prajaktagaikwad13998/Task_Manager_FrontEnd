import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import UpdateTask from './components/UpdateTask';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<TaskForm />} />
        <Route path="/edit/:id" element={<UpdateTask />} />
      </Routes>
    </div>
  );
};

export default App;
