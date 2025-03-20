"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleByFilter = exports.deleteArticle = exports.updateArticle = exports.getArticles = exports.createArticle = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Article_1.default.create(req.body);
        res.status(201).json(article);
    }
    catch (error) {
        res.status(400).json({ error: "Could not create article" });
    }
});
exports.createArticle = createArticle;
const getArticles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = yield Article_1.default.find().populate("category tags");
    res.json(articles);
});
exports.getArticles = getArticles;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedArticle = yield Article_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedArticle) {
            return res.status(404).json({ error: "Article not found" });
        }
        return res.json(updatedArticle);
    }
    catch (error) {
        return res.status(400).json({ error: "Could not update article", details: error });
    }
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedArticle = yield Article_1.default.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ error: "Article not found" });
        }
        return res.json({ message: "Article deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Could not delete article", details: error });
    }
});
exports.deleteArticle = deleteArticle;
const getArticleByFilter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, tags } = req.query;
    try {
        const matchStage = {};
        if (category) {
            matchStage.category = category;
        }
        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim());
            matchStage.tags = { $all: tagsArray };
        }
        const pipeline = [
            { $match: matchStage },
            {
                $lookup: {
                    from: "categories",
                    let: { categoryId: { $toObjectId: "$category" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } }
                    ],
                    as: "categoryMetadata"
                }
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "tags",
                    foreignField: "_id",
                    as: "tagsMetadata"
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    body: 1,
                    image_url: 1,
                    category: 1,
                    categoryMetadata: { $arrayElemAt: ["$categoryMetadata", 0] },
                    tags: 1,
                    tagsMetadata: 1,
                    createdAt: 1,
                    id: 1,
                    date: 1,
                    time: 1,
                    name: 1
                }
            }
        ];
        const filteredArticles = yield Article_1.default.aggregate(pipeline);
        if (!filteredArticles.length) {
            return res.status(404).json({ message: "No articles found matching the filters." });
        }
        return res.json(filteredArticles);
    }
    catch (error) {
        console.error("Error fetching articles:", error);
        return res.status(500).json({
            error: "Could not fetch articles",
            details: error instanceof Error ? error.message : String(error)
        });
    }
});
exports.getArticleByFilter = getArticleByFilter;
