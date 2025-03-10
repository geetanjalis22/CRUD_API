import { Request, Response } from "express";
import Article from "../models/Article";

export const createArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: "Could not create article" });
  }
};

export const getArticles = async (_req: Request, res: Response) => {
  const articles = await Article.find().populate("category tags");
  res.json(articles);
};
