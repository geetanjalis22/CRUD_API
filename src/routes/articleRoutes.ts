import express from "express";
import { createArticle, getArticles } from "../controllers/articleController";

const router = express.Router();

router.post("/", createArticle);
router.get("/", getArticles);

export default router;
