import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectToMongo from "./config/db.js";

import authRoutes from "./modules/auth/auth.routes.js";
import predictionRoutes from "./modules/prediction/prediction.routes.js";
import newsRoutes from "../Routes/newRoutes.js";

import errorMiddleware from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/rateLimiter.middleware.js";

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(globalLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);          // frontend uses this
app.use("/api/predictions", predictionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Fake News Detection System API Running");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});