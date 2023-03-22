const { Router } = require("express");
const {
  getTodo,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  completeTodo,
} = require("../controllers/todocontroller");
const app = Router();

app.get("/", getTodos);
app.get("/:id", getTodo);
app.post("/", createTodo);
app.post("/:id", updateTodo);
app.delete("/:id", deleteTodo);
app.get("/complete/:id", completeTodo);
module.exports = app;
