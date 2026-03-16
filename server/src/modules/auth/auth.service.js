import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./auth.model.js";

/**
 * Register a new user
 * Handles password hashing and database persistence.
 */
export const register = async (userData) => {
  // Check if user already exists before hashing (saves CPU cycles)
  const existingUser = await User.findOne({ email: userData.email }).lean();
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password with a salt round of 12 (Production standard for balance of speed/security)
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  // Convert to object and remove sensitive data before returning
  const userResponse = user.toObject();
  delete userResponse.password;
  
  const token = generateToken(user._id);
  return { token, user:userResponse };
};

/**
 * Authenticate User
 * Compares credentials and generates a signed JWT.
 */
export const login = async ({ email, password }) => {
  // .select("+password") ensures we get the password even if it's hidden by default in the schema
  const user = await User.findOne({ email }).select("+password");
  
  // Generic error message to prevent account enumeration attacks
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate Token
  const token = generateToken(user._id);

  return { 
    token, 
    user: { id: user._id, email: user.email, role: user.role } 
  };
};

/**
 *  Generate JWT
 * Keeps the signing logic centralized.
 */
const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      algorithm: "HS256" // Explicitly define algorithm
    }
    );
  };