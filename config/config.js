import mongoose from "mongoose";
import { DATABASE_CONFIG } from "./configs.variables.js";
import "dotenv/config";

export const dbConnect = async () => {
  try {
    await mongoose.connect(DATABASE_CONFIG.db_url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
