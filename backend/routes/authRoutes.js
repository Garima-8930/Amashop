import express from "express";
const router = express.Router();
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get & update profile
router
  .route("/profile")
  .get(protect, getProfile)
  .put(protect, updateProfile);

export default router;
