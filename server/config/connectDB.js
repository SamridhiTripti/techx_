import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}

export let isMongoConnected = false;

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isMongoConnected = true;
        console.log("connect DB");
    } catch (error) {
        isMongoConnected = false;
        console.log("Error connecting to MongoDB:", error);
    }
}

export default connectDB;