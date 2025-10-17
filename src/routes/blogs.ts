import express from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogsController.js";

const router = express.Router();

// get all blogs
router.get("/", getBlogs);

// get blog
router.get("/:id", getBlog);

// get create blog
router.get("/", createBlog);

// get update blog
router.get("/:id", updateBlog);

// get delete blog
router.get("/:", deleteBlog);

export default router;
