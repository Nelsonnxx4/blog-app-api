import { body } from "express-validator";

export const blogValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 2 })
    .withMessage("Author must be at least 2 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Technology", "Lifestyle", "Programming", "Design", "Other"])
    .withMessage("Invalid category"),
];

export const blogUpdateValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("author")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Author must be at least 2 characters"),

  body("content")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  body("category")
    .optional()
    .trim()
    .isIn(["Technology", "Lifestyle", "Programming", "Design", "Other"])
    .withMessage("Invalid category"),
];
