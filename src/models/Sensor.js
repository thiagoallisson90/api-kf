import mongoose, { Schema } from "mongoose";

const SensorSchema = new Schema({
  device_name: { type: String, required: true },
  rec: { type: Number, required: true },
  sent: { type: Number, required: true },
  pdr: { type: Number, required: false },
  lat: { type: Number, required: false },
  long: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Sensor", SensorSchema);
