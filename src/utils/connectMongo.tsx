import mongoose from "mongoose";
const express = require("express");
import dotenv from "dotenv";
import cors from "cors";  

dotenv.config();
const app = express();
const port = process.env.HOST_ENV || 'http://localhost:3000/';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", (error as Error).message);
    throw new Error("MongoDB connection failed");
  }
};
// CORS middleware configuration
const corsOptions = {
  origin: port, // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE", // Allowable methods
  allowedHeaders: "Content-Type, Authorization", // Allowable headers
};

// Use CORS middleware
app.use(cors(corsOptions));

export default connectMongo;
