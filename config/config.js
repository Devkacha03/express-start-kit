import mongoose from "mongoose";
import "dotenv/config";

const DB = process.env.DATABASE_URL;

export const dbConnect = async () => {
    try {
        await mongoose.connect(DB)
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}