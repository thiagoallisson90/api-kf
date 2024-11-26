import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  luminosity: { type: Number, required: true },
  rssi: { type: Number, required: true },
  counter: { type: Number, required: true },
  lat: { type: Number, required: false },
  long: { type: Number, required: false },
});

export default mongoose.model("Data", DataSchema);
