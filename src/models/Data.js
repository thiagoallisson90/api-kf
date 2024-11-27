import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  luminosity: { type: Number, required: true },
  rssi: { type: Number, required: true },
  lat: { type: Number, required: false },
  long: { type: Number, required: false },
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sensor",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Data", DataSchema);
