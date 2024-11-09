import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const Users = mongoose.model("Users", Schema);
export default Users;
