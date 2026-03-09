import express from "express";
import { predictFakeNews } from "../services/mlService.js";

const router = express.Router();

router.post("/check-news", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text is required"
      });
    }

    const prediction = await predictFakeNews(text);

    res.json({
      result: prediction
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to check news"
    });
  }
});

export default router;