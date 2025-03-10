"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ArticleSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    image_url: { type: String },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tag" }],
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("Article", ArticleSchema);
