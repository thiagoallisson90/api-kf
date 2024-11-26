import User from "../models/User.js";

const create = async (data) => {
  const user = await User.create(data);
  return user;
};

export default { create };
