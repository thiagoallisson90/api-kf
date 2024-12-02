import sensorService from "../services/SensorService.js";

const getByName = async (req, res) => {
  const name = req.params.name;

  if (!name) {
    res.status(400).json({
      error: "Name not found!",
    });
  }

  const sensor = await sensorService.getByName(name);
  res.status(200).json({ sensor });
};

const getAll = async (req, res) => {
  const sensors = await sensorService.getAll();
  res.status(200).json({ sensors });
};

export { getByName, getAll };
