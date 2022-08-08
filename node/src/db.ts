import mongoose from "mongoose";
import "colors";

export default async function connectDB() {
  try {
    let uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("MongoDB connection uri is required");
      process.exit(1);
    }

    const conn = await mongoose.connect(uri, {});
    console.log(
      `MongoDB Connected: db ${conn.connection.name} on ${conn.connection.port} `
        .cyan.underline
    );
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error: ${error.message}`.red.underline.bold);
    console.log(error);
    process.exit(1);
  }
}
