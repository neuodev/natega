import connectDB from "./db";
import express from "express";
import "colors";
import dotenv from "dotenv";
import { seed } from "./seed";
import resultRouter from "./routes/resultRouter";
import { errorHandler } from "./middlewares/errorHandler";
import resultRepo from "./repo/resultRepo";
import cors from "cors";

dotenv.config();

const init = async () => {
  await connectDB();

  let action = process.argv[2];
  if (action === "seed") {
    seed();
  } else if (action === "flush") {
    await resultRepo.flush();
  }

  const app = express();
  app.use(cors());
  app.use("/api/v1", resultRouter);
  app.use(errorHandler);
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`.bgCyan.bold)
  );
};

init();
