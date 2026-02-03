import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// filess
import blogs from "./routes/blogs";
import auth from "./routes/auth";
import logger from "./middleware/logger";
import errorHandler from "./middleware/error";
import notFound from "./middleware/notFound";
import connectDB from "./config/db";

dotenv.config();

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger middleware
app.use(logger);

// Routes
app.use("/auth", auth);
app.use("/blogs", blogs);

app.use(notFound);

// errorhandler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
