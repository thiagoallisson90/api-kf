import Data from "../models/Data.js";

const create = async (data) => {
  const data = await Data.create(data);
  return data;
};

const getData = async () => {
  const data = await Data.find();
  return data;
};

const getDataById = async (id) => {
  const data = await Data.findById(id);
  return data;
};

export default { create, getData, getDataById };
