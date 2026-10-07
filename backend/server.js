import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";

dotenv.config();

console.log("✅ Step 1: .env Loaded");

// ===============================
// CONNECT DATABASE
// ===============================

try {
  await connectDB();
  console.log("✅ Step 2: MongoDB Connected");
} catch (err) {
  console.error("❌ MongoDB Connection Failed:", err);
}

const app = express();

console.log("✅ Step 3: Express Created");

// ===============================
// CORS
// ===============================

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",

  // Old Vercel URL
  "https://amashop-nine.vercel.app",

  // Current Vercel URLs
  "https://amashop-git-main-growwell.vercel.app",
  "https://amashop-gyhh2ksgj-growwell.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // (Postman, direct browser/API requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  })
);

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

console.log("✅ Step 4: Middleware Loaded");

// ===============================
// ROUTES
// ===============================

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingRoutes);

// ===============================
// ROOT ROUTE
// ===============================

app.get("/", (req, res) => {
  res.send("🚀 AMASHOP Backend API is running...");
});

console.log("✅ Step 5: Routes Loaded");

// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});