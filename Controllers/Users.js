import Users from "../Models/Users.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    return res.status(200).json({ message: "Done get Users", users });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Get Users Controller: ${error.message}` });
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, thumbnail } = req.body;
    const user = new Users({ name, thumbnail });
    await user.save();
    return res.status(200).json({ message: "Done Create Users", user });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Create Users Controller: ${error.message}` });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "Cant find User" });
    }
    return res.status(201).json({ message: "Done get user", user });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Update Users Controller: ${error.message}` });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, thumbnail } = req.body;
    const { id } = req.params;

    const user = await Users.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Cant find User" });
    }
    user.name = name || user.name;
    user.thumbnail = thumbnail || user.thumbnail;
    await user.save();
    return res.status(201).json({ message: "Done update users", user });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Update Users Controller: ${error.message}` });
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Done Delete user" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Delete User Controller: ${error.message}` });
  }
};
