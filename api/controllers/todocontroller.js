const mongoose = require("mongoose");
const Todo = require("../Todo");

const getTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).send(todos);
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateTodo = async (req, res) => {
  const update = req.body;
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndUpdate(id, update, { new: true });
    res.status(200).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
};

const createTodo = async (req, res) => {
  const todo = new Todo(req.body);
  try {
    const newTodo = await todo.save();
    res.status(201).send(newTodo);
  } catch (err) {
    res.status(400).send(err);
  }
};

const completeTodo = async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  const completed = todo["completed"];
  const update = {
    completed: !completed,
  };
  try {
    const todo = await Todo.findByIdAndUpdate(id, update, { new: true });
    res.status(200).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = {
  createTodo,
  updateTodo,
  getTodo,
  getTodos,
  deleteTodo,
  completeTodo,
};
