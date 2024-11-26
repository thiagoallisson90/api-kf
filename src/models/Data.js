import mongoose, { Schema } from "mongoose";
import Sensor from "./Sensor.js";

const DataSchema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  luminosity: { type: Number, required: true },
  rssi: { type: Number, required: true },
  counter: { type: Number, required: true },
  lat: { type: Number, required: false },
  long: { type: Number, required: false },
  sensor_id: { type: mongoose.Schema.ObjectId, ref: "Sensor", required: true },
});

export default mongoose.model("Data", DataSchema);
