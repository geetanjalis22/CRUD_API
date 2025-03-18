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
exports.deleteTag = exports.updateTag = exports.getTags = exports.createTag = void 0;
const Tag_1 = __importDefault(require("../models/Tag"));
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield Tag_1.default.create(req.body);
        res.status(201).json(tag);
    }
    catch (error) {
        res.status(400).json({ error: "Could not create tag" });
    }
});
exports.createTag = createTag;
const getTags = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = yield Tag_1.default.find();
    res.json(tags);
});
exports.getTags = getTags;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedTag = yield Tag_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedTag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        return res.json(updatedTag);
    }
    catch (error) {
        return res.status(400).json({ error: "Could not update tag", details: error });
    }
});
exports.updateTag = updateTag;
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTag = yield Tag_1.default.findByIdAndDelete(id);
        if (!deletedTag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        return res.json({ message: "Tag deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Could not delete tag", details: error });
    }
});
exports.deleteTag = deleteTag;
