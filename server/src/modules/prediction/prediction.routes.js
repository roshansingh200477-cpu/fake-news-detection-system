import express from "express";
import {
  createPrediction,
  getUserPredictions,
  deletePrediction
} from "./prediction.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

// Create a prediction
router.post("/", authMiddleware, createPrediction);

// Get logged-in user's predictions
router.get("/", authMiddleware, getUserPredictions);

// Delete a prediction
router.delete("/:id", authMiddleware, deletePrediction);

export default router;