import express from "express";
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controller/todoController.js";
import isAuthanticated from "../middleware/isAuthanticated.js";
const router = express.Router();
router.route("/createTodo").post(isAuthanticated,createTodo);
router.route("/showAllTodos").get(isAuthanticated,getAllTodo);
router.route("/deleteTodo/:id").delete(isAuthanticated,deleteTodo);
router.route("/updateTodo/:id").put(isAuthanticated,updateTodo);

export default router;
