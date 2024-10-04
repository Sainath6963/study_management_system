import express from "express";
import {
  login,
  register,
  getUser,
  logout,
} from "../controller/userControler.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getUser);
router.get("/logout", isAuthenticated, logout);

export default router;
