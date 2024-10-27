import Categories from "../Models/Category";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    return res
      .status(200)
      .json({ message: "Done Get All Categories", categories });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Get Categories Controller: ${error.message}` });
  }
};

export const createCategories = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Categories({
      name,
    });
    await category.save();
    return res
      .status(201)
      .json({ message: "Done Create Category Controller", category });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Create Category Controller: ${error.message}` });
  }
};
