import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Categories = mongoose.model("Categories", Schema);
export default Categories;
