import mongoose from "mongoose";
const express = require("express");
import dotenv from "dotenv";
dotenv.config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", (error as Error).message);
    throw new Error("MongoDB connection failed");
  }
};

export default connectMongo;
