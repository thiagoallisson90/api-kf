import Sensor from "../models/Sensor.js";

const getByName = async (name) => {
  return await Sensor.findOne({
    device_name: name,
  });
};

const getAll = async () => {
  return await Sensor.find();
};

export default { getByName, getAll };
