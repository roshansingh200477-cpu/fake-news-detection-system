import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["text", "url"],  // restriction of allowing the values
      required: true
    },

    content: {
      type: String,
      required: true,
      trim: true    // remove the extra space 
    },

    result: {
      type: String,
      enum: ["Fake", "Real"],
      required: true
    }

  },
  {
    timestamps: true
  }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;