import mongoose from "mongoose";

const officerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      required: true,
      unique: true,
    },
    rank: {
      type: String,
      required: true,
      enum: ["Constable", "Head Constable", "ASI", "SI", "Inspector", "DCP", "ACP"],
      default: "SI",
    },
    zone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["On Duty", "On Patrol", "Off Duty", "On Leave"],
      default: "On Duty",
    },
    caseCount: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Officer = mongoose.models.Officer || mongoose.model("Officer", officerSchema);

export default Officer;
