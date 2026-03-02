import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";

dotenv.config();
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res)=>{
    res.send('the Fake News Detection System API Running');
})
 
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Internal Server Error"  // now all error will return in json not in html 
  });
});