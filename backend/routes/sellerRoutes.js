import express from "express";
import { protect, sellerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🛒 Seller dashboard test route
router.get("/dashboard", protect, sellerOnly, (req, res) => {
  res.json({
    message: `Welcome Seller ${req.user.name}, this is your dashboard!`,
  });
});

export default router;
