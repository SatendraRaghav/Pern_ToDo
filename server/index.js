const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());
console.log("index");
//middleware

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1)",
      [description]
    );
    res.json("Successfull");
  } catch (err) {
    console.log(err.message);
  }
});

//get todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todoData = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todoData.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedData = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(updatedData.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//delete todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await pool.query(
      "DELETE from todo WHERE todo_id = $1",
      [id]
    );
    res.json("Deleted Successfully");
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(3000, () => {
  console.log("Server has started at 3000 port");
});
