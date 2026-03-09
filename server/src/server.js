import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectToMongo from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/rateLimiter.middleware.js";
import predictionRoutes from "./modules/prediction/prediction.routes.js";
import newsRoutes from "../Routes/newRoutes.js";

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// News Route 
app.use("/api/news", newsRoutes);

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
})

// Mount Prediction Routes
app.use("/api/predictions", predictionRoutes);


app.use(globalLimiter)
// Available Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res)=>{
    res.send('the Fake News Detection System API Running');
})

app.use(errorMiddleware);
 
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})
