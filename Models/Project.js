import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: [{ type: Object, required: true }],
  thumbnail: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  },
  style: { type: String },
  videos: [{ type: String }],
  crews: [{ type: Object }],
  review: [{ type: Object }],
  category: { type: String },
  images: [{ before: { type: String }, after: { type: String } }],
  imagesBehindScenes: [{ type: String }],
  reviewBehindScenes: [{ type: Object }],
  order: { type: Number },
  page: { type: Number },
});

const Model = mongoose.model("Projects", Schema);
export default Model;
