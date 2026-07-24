import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Product from "./models/product.js";
import User from "../models/User.js"; // ✅ import User model
import products from "./productsData.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear old data
    await Product.deleteMany();
    await User.deleteMany();
    console.log("🗑️ Old products & users deleted");

    // Insert products
    await Product.insertMany(products);
    console.log("🎉 Products inserted successfully!");

    // Create Admin User
    const adminPassword = bcrypt.hashSync("123456", 10); // default password
    const adminUser = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      isAdmin: true,
    });
    await adminUser.save();
    console.log("👑 Admin user created (email: admin@example.com | pass: 123456)");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err.message);
    process.exit(1);
  }
};

seedDatabase();
