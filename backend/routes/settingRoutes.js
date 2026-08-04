import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingController.js";

const router = express.Router();

// Get Website Settings
router.get("/", getSettings);

// Update Website Settings
router.put("/", updateSettings);

export default router;