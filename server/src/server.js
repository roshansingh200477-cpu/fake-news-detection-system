import dotenv from "dotenv";
dotenv.config();

import connectToMongo from "./config/db.js";
connectToMongo();