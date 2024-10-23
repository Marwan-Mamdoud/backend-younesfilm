import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dk9wy7nq2", // replace with your Cloudinary cloud name
  api_key: "129767425779842", // replace with your Cloudinary API key
  api_secret: "4TWIuTnNLLSsM2D_wmO07vrCI6M", // replace with your Cloudinary API secret
});

export default cloudinary;
