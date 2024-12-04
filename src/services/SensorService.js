import Sensor from "../models/Sensor.js";

const getByName = async (name) => {
  return await Sensor.findOne({
    device_name: name,
  });
};

const getAll = async () => {
  return await Sensor.find();
};

const errorSensor = async (req, res) => {
  try {
    const { device_name } = req.body;
    if (!device_name) {
      return res.status(400).json({
        error: req.body.error,
      });
    }

    const session = await Sensor.startSession();
    session.startTransaction();

    const sensor = await Sensor.findOne({
      device_name,
    });

    if (sensor) {
      await sensor.save({
        sent: sensor.sent + 1,
      });
    }

    await Sensor.create({
      device_name,
      rec: 0,
      sent: data.sent || 1,
      lat: data.lat || 0,
      long: data.long || 0,
    });

    await session.commitTransaction();

    return res.send(400).json({
      error: req.body.error,
    });
  } catch (error) {
    return res.send(400).json({
      error: req.body.error,
    });
  }
};

export default { getByName, getAll, errorSensor };
