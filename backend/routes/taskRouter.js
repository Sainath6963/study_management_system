import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createTask,
  getMyTasks,
  deleteTask,
  updateTask,
} from "../controller/taskControler.js";

const router = express.Router();

router.post("/add", isAuthenticated, createTask);
router.get("/get", isAuthenticated, getMyTasks);
router.delete("/delete/:id", isAuthenticated, deleteTask);
router.put("/update/:id", isAuthenticated, updateTask);

export default router;
