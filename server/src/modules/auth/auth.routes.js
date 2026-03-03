import express from "express";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";

// Controllers
import { loginUser, getUser, createUser } from "./auth.controller.js";

// Middlewares
import authMiddleware from "../../middleware/auth.middleware.js";
import { handleValidationErrors } from "../../middleware/error.middleware.js";

const router = express.Router();


 // Rate Limiter: Prevents brute-force attacks on sensitive endpoints

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per window
  message: "Too many attempts from this IP, please try again after 15 minutes",
});


  // Route 1: POST /api/auth/createUser
  // desc: Register a new user with validation

router.post(
  "/createUser",
  [
    body("name").trim().notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Must be a valid email").normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
    handleValidationErrors, // Custom middleware to catch and return errors
  ],
  createUser
);

  // Route 2: POST /api/auth/login
  // desc: Authenticate user & get token

router.post(
  "/loginUser",
  authLimiter, // Apply rate limiting to login
  [
    body("email").isEmail().withMessage("Invalid credentials").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors,
  ],
  loginUser
);


 //  Route 3: GET /api/auth/getUser
 //  desc:  Get current user profile (Protected)
 
router.get("/getUser", authMiddleware, getUser);

export default router;