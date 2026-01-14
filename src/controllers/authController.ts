import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash passwordd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //   Create new user

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    //   generate tokenn
    const token = Jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET as string,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({
      success: true,
      message: "User signed up successfull",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.error("Signup Error", error);
    next(error);
  }
};

// SignIn
export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    next(error);
  }
};

// Sign Out Controller
export const SignOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // In JWT-based auth, signout is typically handled on the client side
    // by removing the token. But we can add additional logic here if needed

    // Optional: Add token to blacklist (requires additional implementation)
    // const token = req.headers.authorization?.split(' ')[1];
    // await TokenBlacklist.create({ token, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("SignOut Error:", error);
    next(error);
  }
};
