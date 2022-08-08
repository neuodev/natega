import connectDB from "./db";
import express from "express";
import "colors";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;
app.listen(() => console.log(`Server running on port ${PORT}`.bgCyan.bold));
