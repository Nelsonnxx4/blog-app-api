import express from "express";
import cors from "cors";
// filess
import blogs from "./src/routes/blogs.js";
import logger from "./src/middleware/logger.js";
import errorHandler from "./src/middleware/error.js";
import notFound from "./src/middleware/notFound.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// errorhandler middleware
app.use(errorHandler);
app.use(notFound);
// logger middleware
app.use(logger);

// Routes
app.use("/blogs", blogs);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
