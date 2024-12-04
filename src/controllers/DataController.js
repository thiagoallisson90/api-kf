import dataService from "../services/DataService.js";

const create = async (req, res) => {
  try {
    const device_name = req.body.device_name || undefined;
    const temperature = !isNaN(req.body.temperature)
      ? parseFloat(req.body.temperature)
      : undefined;
    const humidity = !isNaN(req.body.humidity)
      ? parseFloat(req.body.humidity)
      : undefined;
    const luminosity = !isNaN(req.body.luminosity)
      ? parseFloat(req.body.luminosity)
      : undefined;
    const rssi = !isNaN(req.body.rssi) ? parseFloat(req.body.rssi) : undefined;
    const sent = !isNaN(req.body.sent) ? parseFloat(req.body.sent) : undefined;
    const lat = !isNaN(req.body.lat) ? parseFloat(req.body.lat) : undefined;
    const long = !isNaN(req.body.long) ? parseFloat(req.body.long) : undefined;

    if (
      device_name == undefined ||
      temperature == undefined ||
      humidity == undefined ||
      luminosity == undefined ||
      rssi == undefined ||
      sent == undefined ||
      lat == undefined ||
      long == undefined
    ) {
      return res.status(400).json({ error: "Data format is invalid!" });
    }

    const data = await dataService.create(req.body);

    return res.status(201).json({
      msg: "Sensored data inserted successfully!",
      data,
    });
  } catch (error) {
    console.error(req.body);
    return res.status(400).json(req.body);
  }
};

const getAllData = async (req, res) => {
  const allData = await dataService.getAllData();
  return res.status(200).json({
    allData,
  });
};

const getDataByDevice = async (req, res) => {
  const device = req.params.device;
  const data = await dataService.getDataByDevice(device);
  return res.status(200).json({
    data,
  });
};

export { create, getAllData, getDataByDevice };
