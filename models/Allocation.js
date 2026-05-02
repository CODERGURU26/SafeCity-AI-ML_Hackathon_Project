import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      unique: true,
    },
    allocatedOfficers: {
      type: Number,
      default: 0,
    },
    availableOfficers: {
      type: Number,
      default: 0,
    },
    requiredOfficers: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["optimal", "warning", "critical"],
      default: "optimal",
    },
  },
  {
    timestamps: true,
  }
);

const Allocation =
  mongoose.models.Allocation || mongoose.model("Allocation", allocationSchema);

export default Allocation;

