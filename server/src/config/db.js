import mongoose from "mongoose";

const connectToMongo = async () => {
    try {
    const mongoURL = process.env.MONGO_URL;
    
    await mongoose.connect(mongoURL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectToMongo;