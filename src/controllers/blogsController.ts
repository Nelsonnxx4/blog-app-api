import type { Request, Response, NextFunction } from "express";
import Blog from "../models/blog";

// @desc get all blogs
// @route GET /blogs
interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  category: string;
  date: string;
}

interface GetBlogsRequest extends Request {
  query: {
    limit?: string;
  };
}

export const getBlogs = (
  req: GetBlogsRequest,
  res: Response,
  next: NextFunction
) => {
  const limit = parseInt(req.query.limit as string);

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(blogs.slice(0, limit));
  } else {
    res.status(200).json(blogs);
  }
};

// @desc get single blog
// @route GET /blogs/:id
export const getBlog = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    const error = new Error(`blog with the id of ${id} was not found`);
    (error as any).status = 404;
    return next(error);
  }

  res.status(200).json(blog);
};

// @desc create new blog
// @route POST /blogs
export const createBlog = (req: Request, res: Response, next: NextFunction) => {
  const { title, author, content, category } = req.body;

  if (!title || !author || !content || !category) {
    const error = new Error("All fields are required");
    (error as any).status = 400;
    return next(error);
  }

  const newBlog = {
    id: blogs.length + 1,
    title,
    author,
    content,
    category,
    date: new Date().toISOString().split("T")[0] as string,
  };

  blogs.push(newBlog);
  res.status(201).json(newBlog);
};

// @desc update blog
// @route PUT /blogs/:id
export const updateBlog = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    const error = new Error(`post with the id of ${id} was not found`);
    (error as any).status = 404;
    return next(error);
  }

  const { title, author, content, category } = req.body;
  if (title) blog.title = title;
  if (author) blog.author = author;
  if (content) blog.content = content;
  if (category) blog.category = category;

  res.status(200).json(blog);
};

// @desc delete blog
// @route DELETE /blogs/:id
export const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    const error = new Error(`A blog with the id of ${id} was not found`);
    (error as any).status = 404;
    return next(error);
  }

  const index = blogs.findIndex((blog) => blog.id === id);
  if (index !== -1) {
    blogs.splice(index, 1);
  }
  res.status(200).json(blogs);
};
