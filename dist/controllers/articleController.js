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
exports.deleteArticle = exports.updateArticle = exports.getArticles = exports.createArticle = void 0;
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
