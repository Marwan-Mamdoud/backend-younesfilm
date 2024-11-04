import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  sortedData: { type: Array, required: true },
});

const Sorted = mongoose.model("Sorted", Schema);
export default Sorted;
