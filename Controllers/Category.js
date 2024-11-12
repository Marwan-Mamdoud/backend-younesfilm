import Categories from "../Models/Category.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({ message: "Done Get All Categories", categories });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Get Categories Controller: ${error.message}` });
  }
};

export const getCategoriesByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const categories = await Categories.find({ name: name });
    res.status(200).json({ message: "Done Get All Categories", categories });
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

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Categories.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ message: "Done Delete Category Succefully." });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Delete Category Controller: ${error.message}` });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Categories.findById(id);
    category.name = name || category.name;
    await category.save();
    return res
      .status(201)
      .json({ message: "Done Update Category Succefully.", category });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: `Error Delete Category Controller: ${error.message}` });
  }
};
