import React, { useState } from 'react';
import axios from 'axios';


const AddTask = ({ setTasks }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { task }; 

    axios
      .post('http://localhost:5000/api/todos', newTask)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setTask(''); 
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  return (
    <div className='row'>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Task Title"
        required
      />
      <button className='btn' type="submit">Add Task</button>
    </form>
    </div>
  );
};

export default AddTask;
