import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export default mongoose.model("Tag", TagSchema);
