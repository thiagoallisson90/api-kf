import mongoose from "mongoose";
import Data from "../models/Data.js";
import Sensor from "../models/Sensor.js";
import { randomUUID } from "node:crypto";

function addSent(sensor, newSent) {
  let sent = sensor.sent;
  if (newSent < sent) {
    sent += newSent; // Soma somente se newSent for menor que o valor atual de sent
  }
  return sent;
}

const create = async (_data) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    let sensor = await Sensor.findOne({
      device_name: _data.device_name,
    });

    let device_name = _data.device_name;

    if (sensor && sensor.sent > _data.sent) {
      sensor.rec++;
      sensor.sent = _data.sent;
      sensor.pdr =
        sensor.sent > 0 && sensor.rec <= sensor.sent
          ? sensor.rec / sensor.sent
          : 1.0;
      sensor.lat = _data.lat;
      sensor.long = _data.long;
      sensor = await sensor.save();
    } else {
      device_name = sensor ? randomUUID().toString() : _data.device_name;
      sensor = await Sensor.create({
        device_name,
        sent: _data.sent,
        lat: _data.lat,
        long: _data.long,
        rec: 1,
        pdr: _data.sent > 0 ? 1 / _data.sent : 1,
      });
    }

    await Data.create({
      device_name,
      temperature: _data.temperature,
      humidity: _data.humidity,
      luminosity: _data.luminosity,
      rssi: _data.rssi,
      sent: _data.sent,
      sensor: sensor._id,
    });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    throw new Error("Fail to insert data!");
  }
};

const getAllData = async () => {
  const data = await Data.find();
  return data;
};

const getDataByDevice = async (device) => {
  const sensors = await Sensor.find({ device_name: device });

  if (sensors.length === 0) {
    return null;
  }

  return await Data.find({ sensor: sensors[0]._id });
};

export default { create, getAllData, getDataByDevice };
