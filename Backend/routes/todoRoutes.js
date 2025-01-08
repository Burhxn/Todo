const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Create 
router.post("/", async (req, res) => {
  const { task, description } = req.body;
  try {
    const newTodo = new Todo({ task, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).send("Error creating task");
  }
});

// Get all 
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(400).send("Error fetching tasks");
  }
});

// Update 
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { task, description, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, description, completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).send("Error updating task");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).send("Task deleted");
  } catch (err) {
    res.status(400).send("Error deleting task");
  }
});

module.exports = router;
