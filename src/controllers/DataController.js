import dataService from "../services/DataService.js";

const create = async (req, res) => {
  try {
    const {
      device_name,
      temperature,
      humidity,
      luminosity,
      rssi,
      sent,
      lat,
      long,
    } = req.body;

    if (
      !device_name ||
      !temperature ||
      !humidity ||
      !luminosity ||
      !rssi ||
      !sent ||
      !lat ||
      !long
    ) {
      res.status(400).json({ error: "Data format is invalid!" });
    }

    const data = await dataService.create(req.body);

    res.status(201).json({
      msg: "Sensored data inserted successfully!",
      data,
    });
  } catch (error) {
    console.error(req.body);
    res.status(400).json(req.body);
  }
};

const getAllData = async (req, res) => {
  const allData = await dataService.getAllData();
  res.status(200).json({
    allData,
  });
};

const getDataByDevice = async (req, res) => {
  const device = req.params.device;
  const data = await dataService.getDataByDevice(device);
  res.status(200).json({
    data,
  });
};

export { create, getAllData, getDataByDevice };
