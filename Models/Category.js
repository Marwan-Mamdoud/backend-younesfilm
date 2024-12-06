import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: Array, required: true },
});

const Categories = mongoose.model("Categories", Schema);
export default Categories;
