import connectDB from "./db";
import express from "express";
import "colors";
import dotenv from "dotenv";
import { seed } from "./seed";

dotenv.config();

const init = async () => {
  await connectDB();

  if (process.argv[2] === "seed") {
    seed();
  }

  const app = express();
  const PORT = process.env.PORT || 8000;
  app.listen(() => console.log(`Server running on port ${PORT}`.bgCyan.bold));
};

init();
