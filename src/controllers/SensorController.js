import userService from "../services/UserService.js";

const create = async (req, res) => {
  const { name, username, email, password, avatar } = req.body;

  if (!name || !username || !email || !password || !avatar) {
    res.status(400).json({ error: "Data format is invalid!" });
  }

  const user = await userService.create(req.body);

  res.status(201).json({
    msg: "User created successfully!",
    user,
  });
};

export default { create };
