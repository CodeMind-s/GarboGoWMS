import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema(
  {
    truckId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Truck", // Reference to the truck who made the request
    },
    area: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
