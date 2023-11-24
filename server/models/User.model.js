import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  saved_news: {
    type: [],
    default: [],
  },
});

export default mongoose.model("User", UserSchema);
