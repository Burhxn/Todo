import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import FilterTask from "./FilterTask";
import "./TaskList.scss";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleComplete = (id, currentStatus) => {
    axios
      .put(`http://localhost:5000/api/todos/${id}`, {
        completed: !currentStatus,
      })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? response.data : task))
        );
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEdit = (id) => {
    setEditingTaskId(id);
  };

  const closeEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="task">
      <h1>To-Do List 📝</h1>
      <AddTask setTasks={setTasks} />
      <FilterTask setFilter={setFilter} />
      {editingTaskId && (
        <EditTask
          taskId={editingTaskId}
          setTasks={setTasks}
          closeEdit={closeEdit}
        />
      )}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <span className={task.completed ? "completed" : ""}>
              {task.task}
            </span>

            <button
              className={task.completed ? "undo" : "complete"}
              onClick={() => handleComplete(task._id, task.completed)}
            >
              {task.completed ? "Undo" : "Done"}
            </button>

            <button className="delete" onClick={() => handleDelete(task._id)}>
              Delete
            </button>
            <button className="edit" onClick={() => handleEdit(task._id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
