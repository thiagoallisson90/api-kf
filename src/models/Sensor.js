import mongoose, { Schema } from "mongoose";

const SensorSchema = new Schema({
  device_id: { type: Number, required: true },
  rec: { type: Number, required: true },
  sent: { type: Number, required: true },
  pdr: { type: Number, required: false },
});

export default mongoose.model("Sensor", SensorSchema);
