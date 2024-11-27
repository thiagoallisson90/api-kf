import dataService from "../services/DataService.js";

const create = async (req, res) => {
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
};

export { create };
