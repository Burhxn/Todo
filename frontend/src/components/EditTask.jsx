import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditTask.scss"

const EditTask = ({ taskId, setTasks, closeEdit }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/todos/${taskId}`)
      .then((response) => {
        setTask(response.data.task); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
        setLoading(false); 
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = { task };

    axios
      .put(`http://localhost:5000/api/todos/${taskId}`, updatedTask)
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === taskId ? response.data : t
          )
        );
        closeEdit(); 
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-task-form">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task Title"
          required
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={closeEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTask;
