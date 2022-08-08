import mongoose from "mongoose";
import "colors";

export default async function connectDB() {
  try {
    let uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("MongoDB connection uri is required");
      process.exit(1);
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
}
