import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/blog-api";

    const conn = await mongoose.connect(MONGODB_URI);

    console.log(colors.cyan(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(colors.red(`Error: ${(error as Error).message}`));
    process.exit(1);
  }
};

export default connectDB;
