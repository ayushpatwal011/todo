import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controller/todo.controller.js";

const router = express.Router()

router.post("/create", createTodo)
router.get("/featch", getTodos)
router.put("/update/:id", updateTodo)
router.delete("/delete/:id", deleteTodo)

export default router