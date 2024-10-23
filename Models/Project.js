import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  },
  videos: [{ type: String }],
  crews: [{ name: String, job: String }],
  review: { type: String },
  images: [{ type: String }],
  imagesBehindScenes: [{ type: String }],
  reviewBehindScenes: { type: String },
});

const Model = mongoose.model("Projects", Schema);
export default Model;
