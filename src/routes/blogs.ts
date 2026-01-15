import express from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogsController.js";
import { authenticate } from "middleware/auth.js";
import { blogValidation } from "middleware/blogValidation.js";

const router = express.Router();

// get all blogs
router.get("/", getBlogs);

// get blog
router.get("/:id", getBlog);

// get create blog
router.post("/", authenticate, blogValidation, createBlog);

// get update blog
router.put("/:id", authenticate, blogValidation, updateBlog);

// get delete blog
router.delete("/:id", authenticate, blogValidation, deleteBlog);

export default router;
