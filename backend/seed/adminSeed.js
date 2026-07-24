// backend/seed/adminSeed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@test.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit();
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("123456", 10);
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("🎉 Admin created successfully:", adminUser.email);
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
    process.exit(1);
  }
};

seedAdmin();
