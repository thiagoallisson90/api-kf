import Sensor from "../models/Sensor.js";

const getByName = async (name) => {
  return await Sensor.findOne({
    device_name: name,
  });
};

export default { getByName };
