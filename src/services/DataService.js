import mongoose from "mongoose";
import Data from "../models/Data.js";
import Sensor from "../models/Sensor.js";

const create = async (_data) => {
  const session = await mongoose.startSession();

  let sensor = await Sensor.findOne({
    device_name: _data.device_name,
  });
  if (sensor) {
    sensor.rec++;
    sensor.sent = _data.sent;
    sensor.pdr =
      sensor.sent > 0 && sensor.rec <= sensor.sent
        ? sensor.rec / sensor.sent
        : 1.0;
    sensor = await sensor.save();
  } else {
    sensor = await Sensor.create({
      device_name: _data.device_name,
      sent: _data.sent,
      rec: 1,
      pdr: _data.sent > 0 ? 1 / _data.sent : 1,
    });
  }

  await Data.create({
    device_name: _data.device_name,
    temperature: _data.temperature,
    humidity: _data.humidity,
    luminosity: _data.luminosity,
    rssi: _data.rssi,
    sent: _data.sent,
    lat: _data.lat,
    long: _data.long,
    sensor: sensor._id,
  });

  await session.endSession();
};

/*const getData = async () => {
  const data = await Data.find();
  return data;
};

const getDataById = async (id) => {
  const data = await Data.findById(id);
  return data;
};

const getDataByDevice = async (device_id) => {
  const data = await Data.find({ device_id: device_id });
  return data;
};*/

export default { create };
