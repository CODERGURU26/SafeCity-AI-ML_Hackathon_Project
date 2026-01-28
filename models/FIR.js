import mongoose from "mongoose";

const firSchema = new mongoose.Schema(
  {
    firId: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "Theft",
        "Assault",
        "Fraud",
        "Robbery",
        "Vandalism",
        "Cyber Crime",
        "Other",
      ],
    },
    location: {
      type: String,
      required: true,
    },
    complainant: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "investigating", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    officer: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    evidence: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Create or retrieve the FIR model
const FIR = mongoose.models.FIR || mongoose.model("FIR", firSchema);

export default FIR;
