import express from "express";
import cors from "cors";
// filess
import blogs from "./routes/blogs";
import auth from "./routes/auth";
import logger from "./middleware/logger";
import errorHandler from "./middleware/error";
import notFound from "./middleware/notFound";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", auth);
app.use("/blogs", blogs);

app.use(notFound);

// errorhandler middleware
app.use(errorHandler);

// logger middleware
app.use(logger);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
