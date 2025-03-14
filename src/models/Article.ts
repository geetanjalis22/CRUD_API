/*import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  image_url: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});
//Additions: id, date, time, name
export default mongoose.model("Article", ArticleSchema);*/
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  image_url: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Article", ArticleSchema);
