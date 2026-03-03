import rateLimit from "express-rate-limit";

// Global limiter for entire API
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP per 15 minutes
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable old X-RateLimit headers
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again later."
  }
});