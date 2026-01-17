import type { Request, Response, NextFunction } from "express";
import Blog from "../models/blog";
import { validationResult } from "express-validator";

// @desc    Get all blogs
// @route   GET /blogs
// @access  Public
export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt(req.query.limit as string);

    let query = Blog.find()
      .populate("userId", "name email") // Populate user info
      .sort({ createdAt: -1 }); // Newest first

    if (!isNaN(limit) && limit > 0) {
      query = query.limit(limit);
    }

    const blogs = await query;

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Get Blogs Error:", error);
    next(error);
  }
};

// @desc    Get single blog
// @route   GET /blogs/:id
// @access  Public
export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "userId",
      "name email"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${req.params.id} was not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if ((error as any).kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${req.params.id} was not found`,
      });
    }
    console.error("Get Blog Error:", error);
    next(error);
  }
};

// @desc    Create new blog
// @route   POST /blogs
// @access  Private (requires authentication)
export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, author, content, category } = req.body;

    // Create blog with authenticated user's ID
    const blog = await Blog.create({
      title,
      author,
      content,
      category,
      userId: req.userId, // From auth middleware
    });

    // Populate user info before sending response
    await blog.populate("userId", "name email");

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    next(error);
  }
};

// @desc    Update blog
// @route   PUT /blogs/:id
// @access  Private (requires authentication)
export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${req.params.id} was not found`,
      });
    }

    // Check if user owns the blog
    if (blog.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this blog",
      });
    }

    const { title, author, content, category } = req.body;

    // Update only provided fields
    if (title !== undefined) blog.title = title;
    if (author !== undefined) blog.author = author;
    if (content !== undefined) blog.content = content;
    if (category !== undefined) blog.category = category;

    const updatedBlog = await blog.save();
    await updatedBlog.populate("userId", "name email");

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    if ((error as any).kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${req.params.id} was not found`,
      });
    }
    console.error("Update Blog Error:", error);
    next(error);
  }
};

// @desc    Delete blog
// @route   DELETE /blogs/:id
// @access  Private (requires authentication)
export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${req.params.id} was not found`,
      });
    }

    // Check if user owns the blog
    if (blog.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: {},
    });
  } catch (error) {
    if ((error as any).kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: `Blog with id ${req.params.id} was not found`,
      });
    }
    console.error("Delete Blog Error:", error);
    next(error);
  }
};

// @desc    Get blogs by authenticated user
// @route   GET /blogs/my-blogs
// @access  Private
export const getMyBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await Blog.find({ userId: req.userId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Get My Blogs Error:", error);
    next(error);
  }
};
