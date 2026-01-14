import { Router } from "express";
import {
  SignUp,
  SignIn,
  SignOut,
  GetCurrentUser,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";
import { signUpValidation, signInValidation } from "../middleware/validation";

const router = Router();

// Public routes
router.post("/signup", signUpValidation, SignUp);
router.post("/login", signInValidation, SignIn);
router.post("/signout", SignOut);

// Protected routes
router.get("/me", authenticate, GetCurrentUser);

export default router;
