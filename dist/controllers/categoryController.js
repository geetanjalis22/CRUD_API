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
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.create(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ error: "Could not create category" });
    }
});
exports.createCategory = createCategory;
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Category_1.default.find();
    console.log("📋 Retrieved Categories:", categories);
    res.json(categories);
});
exports.getCategories = getCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedCategory = yield Category_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.json(updatedCategory);
    }
    catch (error) {
        return res.status(400).json({ error: "Could not update category", details: error });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCategory = yield Category_1.default.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Could not delete category", details: error });
    }
});
exports.deleteCategory = deleteCategory;
