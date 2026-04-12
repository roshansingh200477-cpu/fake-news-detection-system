import express from "express";
import {
  createPrediction,
  getUserPredictions,
  deletePrediction
} from "./prediction.controller.js";

import authMiddleware, { optionalAuth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", optionalAuth, createPrediction);
router.get("/", authMiddleware, getUserPredictions);
router.delete("/:id", authMiddleware, deletePrediction);

export default router;